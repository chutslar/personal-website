"use client";
import * as React from "react";
import { MainAppBar } from "./MainAppBar";
import { MainDrawer } from "./MainDrawer";
import Script from "next/script";

type RenderParameters = {
  sitekey: string;
  theme?: "light" | "dark";
  callback?(token: string): void;
};

declare global {
  interface Window {
    onload(): void;
    onloadTurnstileCallback(): void;
    turnstile: {
      render(container: string | HTMLElement, params: RenderParameters): string;
    };
    turnstileCallback: (token: string) => void;
  }
}

export function Main(props: { children: React.ReactNode }) {
  const [drawerState, toggleDrawerState] = React.useState(false);
  return (
    <main
      className="flex flex-col items-center justify-between p-24 main-elem"
      style={{ height: "100%" }}
    >
      <Script id="console-warning">
        {
          // Adapted from https://github.com/scratchfoundation/scratch-www/pull/1946/commits/1a6fa9466fc136154ff31e5667089e6d2e305006
          `console.log(
              "%cStop!",
              "color: #F00; font-size: 30px; -webkit-text-stroke: 1px black; font-weight:bold",
            );
            console.log(
              "This is part of your browser intended for developers. " +
                "If someone told you to copy-and-paste something here, " +
                "don't do it! It could allow them to take over your " +
                "account, delete your data, or do many " +
                "other harmful things. If you don't understand what exactly " +
                "you are doing here, you should close this window without doing " +
                "anything.",
            );`
        }
      </Script>
      <MainAppBar toggleDrawerState={toggleDrawerState} />
      <MainDrawer
        drawerState={drawerState}
        toggleDrawerState={toggleDrawerState}
      />
      {props.children}
    </main>
  );
}
