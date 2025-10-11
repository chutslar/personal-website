import { Box, Divider, Typography } from "@mui/material";
import { Main } from "../components/Main";
import Nico from "../assets/nico_sleeping.jpg";
import Image from "next/image";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function AboutMe() {
  return (
    <Main>
      <Box maxWidth="700px">
        <Typography variant="h3" align="center">
          About Me
        </Typography>
        <Divider />
        <AboutMeItem snippet="I am a software engineer who works from home, currently living in Indiana." />
        <AboutMeItem snippet="At work I use Java, Python, and Typescript with React - this website is made with Next.js using Cloudflare Pages." />
        <AboutMeItem
          snippet={`I have a cute cat named Nico who is ${dayjs.utc().diff(dayjs.utc("2021-04-03T12:00:00.000Z"), "years")} years old.`}
        />
        <Image src={Nico} alt="Nico" priority={true} />
        <AboutMeItem snippet="I have a wonderful girlfriend named Lucerito who is the love of my life 💕" />
        <AboutMeItem snippet="My favorite sports are football and baseball; I mostly root for the Packers and the Brewers." />
        <AboutMeItem snippet="One of my favorite games is Hollow Knight, now I just need time to play Silksong 😮‍💨" />
      </Box>
    </Main>
  );
}

function AboutMeItem(props: { snippet: string }) {
  return (
    <Typography variant="body1" padding="12px 24px" align="center">
      {props.snippet}
    </Typography>
  );
}
