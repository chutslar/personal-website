import { Box, Divider, Typography } from "@mui/material";
import { Main } from "../components/Main";
import Nico from "../assets/nico_sleeping.jpg"
import Image from "next/image";

const snippets = [
  "",
  "At work I mostly use Java, but I also sometimes use Typescript with React - this website is made with Next.js using Cloudflare Pages."
]

export default function AboutMe() {
  return (
    <Main>
      <Box maxWidth="700px">
        <Typography variant="h3" align="center">
          About Me
        </Typography>
        <Divider />
        <AboutMeItem snippet="I am a software engineer who works from home, currently living in Indiana." />
        <AboutMeItem snippet="At work I mostly use Java, but I also sometimes use Typescript with React - this website is made with Next.js using Cloudflare Pages." />
        <AboutMeItem snippet={`I have a cute cat named Nico who is ${new Date(Date.now().valueOf() - new Date("April 4, 2021 12:00:00").valueOf()).getUTCFullYear() - 1970} years old.`} />
        <Image src={Nico} alt="Nico"/>
      </Box>
    </Main>
  );
}
function AboutMeItem(props: {snippet: string}) {
  return <Typography variant="body1" padding="12px 24px" align="center">{props.snippet}</Typography>;
}

