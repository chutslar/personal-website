import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import "./globals.css";
import theme from "./theme";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christian Hutslar",
  description: "Personal website for Christian Hutslar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg" sizes="any" />
      </head>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <body className={montserrat.className} style={{ height: "100%" }}>
            {children}
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
