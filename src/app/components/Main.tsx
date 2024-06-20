import * as React from 'react';
import { MainAppBar } from "./MainAppBar";
import { MainDrawer } from "./MainDrawer";

export function Main(props: {children: React.ReactNode}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainAppBar />
      <MainDrawer />
      {props.children}
    </main>
  );
}
