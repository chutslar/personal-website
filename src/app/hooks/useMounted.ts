"use client";
import { useEffect, useState } from "react"

// From https://medium.com/@eric.burel/how-to-get-rid-of-window-is-not-defined-and-hydration-mismatch-errors-in-next-js-567cc51b4a17
export const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>();
  // effects run only client-side
  // so we can detect when the component is hydrated/mounted
  // @see https://react.dev/reference/react/useEffect
  useEffect(() => {
      setMounted(true)
  }, []);
  return mounted;
}