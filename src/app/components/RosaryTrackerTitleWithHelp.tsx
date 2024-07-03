import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Row from "./Row";
import { Check, Help, MenuBook } from "@mui/icons-material";
import Link from "next/link";

export default function RosaryTrackerTitleWithHelp() {
  const [isHelpDialogOpen, setHelpDialogOpen] = useState(false);
  return (
    <Row
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Rosary Tracker</Typography>
      <IconButton
        sx={{ color: "var(--primary-color)" }}
        onClick={() => setHelpDialogOpen(true)}
      >
        <Help />
      </IconButton>
      <Dialog
        open={isHelpDialogOpen}
        keepMounted
        onClose={() => setHelpDialogOpen(false)}
        aria-describedby="help-dialog"
        sx={{ textAlign: "center" }}
      >
        <DialogTitle>Rosary Tracker</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: "12px" }}>
            Many Catholics{" "}
            <Link href="https://en.wikipedia.org/wiki/Rosary">
              pray the rosary
            </Link>{" "}
            on a regular basis. This is a simple app to walk through the steps
            of praying the rosary, and to keep track of them, a little like
            Duolingo.
          </DialogContentText>
          <Row>
            <MenuBook sx={{ color: "var(--primary-color)" }} />
            <Typography variant="body2">
              {
                ": press this button to walk you through the prayers of each mystery"
              }
            </Typography>
          </Row>
          <Row>
            <Check sx={{ color: "var(--primary-color)" }} />
            <Typography variant="body2">
              {
                ": press this button when you've finished praying to save your progress"
              }
            </Typography>
          </Row>
          <DialogContentText sx={{ mt: "12px" }}>
            Each mystery is accompanied by one or more readings to help you get
            in the mindset of the mystery. What does CCC mean?{" "}
            <Link href="https://edmundmitchell.com/writing/how-to-use-a-catechism">
              Here
            </Link>{" "}
            is a guide on the Catechism and how to use it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelpDialogOpen(false)}>
            <Typography variant="button">Close</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Row>
  );
}
