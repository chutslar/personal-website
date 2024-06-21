"use client";
import * as React from 'react';
import { MainAppBar } from "./MainAppBar";
import { MainDrawer } from "./MainDrawer";

export function Main(props: {children: React.ReactNode}) {
  const [drawerState, toggleDrawerState] = React.useState(false);
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <MainAppBar toggleDrawerState={toggleDrawerState} />
      <MainDrawer drawerState={drawerState} toggleDrawerState={toggleDrawerState} />
      {props.children}
    </main>
  );
}
