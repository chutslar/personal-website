"use client";
import { Box, Button, Typography } from "@mui/material";
import { setCookie } from "cookies-next";
import { useCallback, useMemo, useState } from "react";
import { SafeTurnstileWrapper } from "./SafeTurnstileWrapper";
import { useMounted } from "../hooks/useMounted";
import { makeLoginRequest } from "./utils/makeApiRequests";

const userNameRegex = /[\w\-]+/;

export default function LoginScreen(props: {
  setLoggedInUserName: (userName: string) => void;
}) {
  const mounted = useMounted();
  // The username that the user inputs.
  const [userName, setUserName] = useState("");
  // True if the Cloudflare Turnstile returned a success, false otherwise.
  const [passedTurnstile, setPassedTurnstile] = useState(false);
  // The token returned from Cloudflare Turnstile, used to verify that the user is not
  // a bot when logging in or creating an account.
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>(
    undefined,
  );
  // The error message shown to the user when the userName input is not valid.
  const userNameError = useMemo(() => {
    if (userName.length == 0) {
      return "Must enter username";
    } else if (userName.length < 8) {
      return "Username must be at least 8 characters";
    } else if (userName.length >= 40) {
      return "Username must be fewer than 40 characters";
    } else {
      const regexMatch = userName.match(userNameRegex);
      if (!regexMatch) {
        return "Username must only contain letters, numbers, and these characters: -, _";
      }
      return "";
    }
  }, [userName]);
  // The error message shown to the user when they were unable to login.
  const [loginError, setLoginError] = useState("");
  // True if the userName or Turnstile verififications have not yet been passed, i.e. the user can't yet login or create account.
  const buttonsDisabled = useMemo(
    () => userNameError.length > 0 || !passedTurnstile,
    [userNameError, passedTurnstile],
  );

  // A callback to verify on the server that the Turnstile succeeded.
  const turnstileCallback = (token: string) => {
    setPassedTurnstile(true);
    setTurnstileToken(token);
  };

  // Attach the callback to the window object so that it can be called from the Cloudflare widget.
  if (mounted) {
    window.turnstileCallback = turnstileCallback;
  }

  // Set the userName cookie so that it can be referenced in other parts of the webapp.
  const setUserNameCookie = useCallback(
    (userName: string) => {
      setCookie("userName", userName);
      props.setLoggedInUserName(userName);
    },
    [props],
  );

  // Send the login request to the server.
  const submitLogin = useCallback(() => {
    const login = async () => {
      if (turnstileToken) {
        const result = await makeLoginRequest(userName, turnstileToken);
        if (result.status == 200) {
          setUserNameCookie(userName);
        } else if (result.status == 404) {
          setLoginError(
            "No user with that username exists. Would you like to refresh and create that account instead?",
          );
        } else {
          setLoginError("Failed to login, please refresh.");
        }
      }
    };
    login();
  }, [userName, turnstileToken, setUserNameCookie]);

  // Send the create user account request to the server.
  const submitCreateUser = useCallback(() => {
    const createUser = async () => {
      const result = await fetch(`/api/createUser?user=${userName}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: turnstileToken }),
      });
      if (result.status == 200) {
        setUserNameCookie(userName);
        return;
      } else if (result.status == 403) {
        setLoginError(
          "A user already exists with that username, please refresh and choose another.",
        );
      } else {
        setLoginError("Failed to login, please refresh.");
      }
    };
    createUser();
  }, [userName, turnstileToken, setUserNameCookie]);

  return (
    <Box
      sx={{
        height: "min(100%, 400px)",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">
        {"If you're new, pick a username and create your account 🙂"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          padding: "8px",
        }}
      >
        <Typography style={{ paddingRight: "6px" }} variant="body1">
          Username:
        </Typography>
        <input
          className="border border-gray-800"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Box>
      <Typography textAlign="center" color="red" variant="body1">
        {userNameError}
      </Typography>
      <SafeTurnstileWrapper />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          padding: "8px",
        }}
      >
        <Button disabled={buttonsDisabled} onClick={submitLogin}>
          <Typography variant="body1">Log In</Typography>
        </Button>
        <Button disabled={buttonsDisabled} onClick={submitCreateUser}>
          <Typography variant="body1">Create Account</Typography>
        </Button>
      </Box>
      <Typography textAlign="center" color="red" variant="body1">
        {loginError}
      </Typography>
      <Typography variant="body1">
        {"Don't forget your username! Maybe write it down somewhere 😅"}
      </Typography>
    </Box>
  );
}
