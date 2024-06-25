"use client";
import * as React from "react";
import { MainAppBar } from "./MainAppBar";
import { MainDrawer } from "./MainDrawer";

type RenderParameters = {
  sitekey: string;
  theme?: "light" | "dark";
  callback?(token: string): void;
};

declare global {
  interface Window {
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
      className="flex flex-col items-center justify-between p-24"
      style={{ height: "100%" }}
    >
      <MainAppBar toggleDrawerState={toggleDrawerState} />
      <MainDrawer
        drawerState={drawerState}
        toggleDrawerState={toggleDrawerState}
      />
      {props.children}
    </main>
  );
}
