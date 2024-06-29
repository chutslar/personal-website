import { Box, Card, Typography } from "@mui/material";
import Link from "next/link";
import { Main } from "./components/Main";

export default function Home() {
  return (
    <Main>
      <Box
        sx={{
          textAlign: "center",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "320px",
        }}
      >
        <Typography variant="h3">Welcome!</Typography>
        <Card
          sx={{
            height: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">
            <Link href="/about-me">About Me</Link>
          </Typography>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Typography variant="h5">
            <Link href="/rosary-tracker">Rosary Tracker</Link>
          </Typography>
          <Typography variant="body1">
            Many Catholics{" "}
            <Link href="https://en.wikipedia.org/wiki/Rosary">
              pray the rosary
            </Link>{" "}
            on a regular basis. This is a simple app to walk through the steps
            of praying the rosary, and to keep track of them, a little like
            Duolingo.
          </Typography>
        </Card>
      </Box>
    </Main>
  );
}
