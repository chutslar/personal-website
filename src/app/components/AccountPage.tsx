"use client";

import { Box, Divider, Link, Typography } from "@mui/material";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import { deleteCookie, getCookie } from "cookies-next";

export default function AccountPage() {
  const [loggedInUserName, setLoggedInUserName] = useState(getCookie("userName") || "");
  const logout = () => {
    deleteCookie("userName");
    setLoggedInUserName("");
  }
  return (
    <Box maxWidth="700px">
      <Typography variant="h4" align="center">
        Your Data
      </Typography>
      <Divider />
      <Box sx={{
        paddingTop: "16px",
      }}>
        {loggedInUserName &&
          <Box>
            <Typography variant="body1">Username: {loggedInUserName}</Typography>
            <Link component="button" variant="body1" onClick={logout}>Sign out</Link>
          </Box>
        }
        {!loggedInUserName &&
          <LoginScreen setLoggedInUserName={setLoggedInUserName} />
        }
      </Box>
    </Box>
  )
}