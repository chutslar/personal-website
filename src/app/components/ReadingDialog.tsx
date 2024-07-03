import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Vollkorn } from "next/font/google";
import Mystery from "../types/Mystery";
import ParagraphsFromText from "./ParagraphsFromText";
import { ReadonlyDeep } from "type-fest";

const vollkorn = Vollkorn({ subsets: ["latin"] });

export default function ReadingDialog(props: {
  currentMystery: ReadonlyDeep<Mystery>;
}) {
  const [isReadingOpen, setReadingOpen] = useState(false);
  return (
    <Box>
      <MuiLink
        component="button"
        onClick={() => setReadingOpen(true)}
        underline="hover"
      >
        Readings
      </MuiLink>
      <Dialog
        open={isReadingOpen}
        keepMounted
        onClose={() => setReadingOpen(false)}
        aria-describedby="reading-dialog"
        scroll="paper"
      >
        <Box sx={{ padding: "12px" }}>
          <DialogTitle sx={{ textAlign: "center" }}>
            {props.currentMystery.name} Readings
          </DialogTitle>
          <DialogContent
            className={vollkorn.className}
            sx={{ color: "var(--dark-grey)" }}
          >
            {props.currentMystery.messages.map((message, i) => (
              <Box key={i}>
                <ParagraphsFromText text={message.text} />
                <p>- {message.source}</p>
                <Divider sx={{ margin: "12px 0" }} />
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReadingOpen(false)}>
              <Typography variant="button">Close</Typography>
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
