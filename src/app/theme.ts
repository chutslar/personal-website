"use client";
import { Montserrat } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#237b93",
    },
    secondary: {
      main: "#239373",
    },
  },
});

export default theme;
