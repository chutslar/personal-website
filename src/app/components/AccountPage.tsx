"use client";

import { Box, Divider, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LoginScreen from "./LoginScreen";
import { deleteCookie, getCookie } from "cookies-next";
import { useMounted } from "../hooks/useMounted";

export default function AccountPage() {
  const mounted = useMounted();
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const logout = () => {
    deleteCookie("userName");
    setLoggedInUserName("");
  };
  useEffect(() => {
    if (mounted) {
      const userNameCookie = getCookie("userName");
      if (userNameCookie) {
        setLoggedInUserName(userNameCookie);
      }
    }
  }, [mounted]);
  return (
    <Box maxWidth="700px">
      <Typography variant="h4" align="center">
        Your Data
      </Typography>
      <Divider />
      <Box
        sx={{
          paddingTop: "16px",
        }}
      >
        {loggedInUserName && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">
              Username: {loggedInUserName}
            </Typography>
            <Link component="button" variant="body1" onClick={logout}>
              Sign out
            </Link>
          </Box>
        )}
        {!loggedInUserName && (
          <LoginScreen setLoggedInUserName={setLoggedInUserName} />
        )}
      </Box>
    </Box>
  );
}
