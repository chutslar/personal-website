import { Box, Card, Typography } from "@mui/material";
import Link from "next/link";
import { Main } from "./components/Main";

export default function Home() {
  return (
    <Main>
      <Box
        sx={{
          textAlign: "center",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "320px",
        }}
      >
        <Typography variant="h3">Welcome!</Typography>
        <article>
          I am a full-stack software developer from the US. You can learn more about me{" "}
          <a href="/about-me">here</a>, or you can see some of the things I&apos;ve made:
        </article>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">
            <Link href="https://semi-useful-tools.com" target="_blank">Semi-Useful Tools</Link>
          </Typography>
          <Typography variant="body1">
            A portfolio website with several nifty tools like a voice recorder, to-do app, etc.
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
