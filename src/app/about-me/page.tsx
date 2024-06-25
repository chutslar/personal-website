import { Box, Divider, Typography } from "@mui/material";
import { Main } from "../components/Main";
import Nico from "../assets/nico_sleeping.jpg";
import Image from "next/image";
import { differenceInYears } from "date-fns";

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
        <AboutMeItem
          snippet={`I have a cute cat named Nico who is ${differenceInYears(Date.now(), new Date("April 3, 2021 12:00:00"))} years old.`}
        />
        <Image src={Nico} alt="Nico" priority={true} />
        <AboutMeItem snippet="I have a wonderful girlfriend named Lucerito who is the love of my life 💕" />
        <AboutMeItem snippet="My favorite sports are football and baseball; I mostly root for the Packers and the Brewers." />
        <AboutMeItem snippet="One of my favorite games is Hollow Knight, hopefully Silksong comes out soon 🤞" />
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
