import { Box, Divider, Typography } from "@mui/material";
import { Main } from "../components/Main";

export default function Home() {
  return (
    <Main>
      <Box>
        <Typography variant="h3">
          About Me
        </Typography>
        <Divider />
        <Typography variant="body1">I am a software engineer who works from home, currently living in Indiana.</Typography>
      </Box>
    </Main>
  );
}
