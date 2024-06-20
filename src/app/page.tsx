import { Box, Typography } from "@mui/material";
import { Main } from "./components/Main";

export default function Home() {
  return (
    <Main>
      <Box>
        <Typography variant="h3">
          Welcome to my website!
        </Typography>
      </Box>
    </Main>
  );
}
