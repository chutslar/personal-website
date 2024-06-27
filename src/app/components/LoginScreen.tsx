"use client";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { setCookie } from "cookies-next";
import { useCallback, useMemo, useState } from "react";
import { SafeTurnstileWrapper } from "./SafeTurnstileWrapper";
import { useMounted } from "../hooks/useMounted";
import {
  makeCreateUserRequest,
  makeLoginRequest,
} from "./utils/makeApiRequests";
import Row from "./Row";

const userNameRegex = /[\w\-_]+/;
const passwordRegex = /[\w\-_!@#$%^&*]+/;

export default function LoginScreen(props: {
  setLoggedInUserName: (userName: string) => void;
}) {
  const mounted = useMounted();
  // The username that the user inputs.
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // True if the Cloudflare Turnstile returned a success, false otherwise.
  const [passedTurnstile, setPassedTurnstile] = useState(false);
  // The token returned from Cloudflare Turnstile, used to verify that the user is not
  // a bot when logging in or creating an account.
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>(
    undefined,
  );
  const [submitIsCreate, setSubmitIsCreate] = useState(true);
  // The error message shown to the user when the userName input is not valid.
  const userNameError = useMemo(() => {
    if (userName.length == 0) {
      return "Please enter your username";
    } else if (userName.length < 4) {
      return "Username must be at least 4 characters";
    } else if (userName.length > 30) {
      return "Username must be fewer than 30 characters";
    } else {
      const regexMatch = userName.match(userNameRegex);
      if (!regexMatch) {
        return "Username must only contain letters, numbers, and these characters: -_";
      }
      return "";
    }
  }, [userName]);
  const passwordError = useMemo(() => {
    if (password.length == 0) {
      return "Please enter your password";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters";
    } else if (password.length > 30) {
      return "Password must be fewer than 30 characters";
    } else {
      const regexMatch = password.match(passwordRegex);
      if (!regexMatch) {
        return "Password must only contain letters, numbers, and these characters: -_!@#$%^&*";
      }
      return "";
    }
  }, [password]);
  // The error message shown to the user when they were unable to login.
  const [loginError, setLoginError] = useState("");
  // True if the userName or Turnstile verififications have not yet been passed, i.e. the user can't yet login or create account.
  const submitButtonDisabled = useMemo(
    () =>
      userNameError.length > 0 ||
      passwordError?.length > 0 ||
      (submitIsCreate && !passedTurnstile),
    [userNameError, passedTurnstile, passwordError, submitIsCreate],
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
      if (userNameError.length == 0 && passwordError.length == 0) {
        const result = await makeLoginRequest(userName, password);
        if (result.status == 200) {
          setUserNameCookie(userName);
        } else if (result.status == 403) {
          setLoginError("Incorrect password");
        } else if (result.status == 404) {
          setLoginError(
            "No user with that username exists. Would you like to create that account instead?",
          );
        } else {
          setLoginError("Failed to login, please refresh and try again.");
        }
      }
    };
    login();
  }, [userName, userNameError, password, passwordError, setUserNameCookie]);

  // Send the create user account request to the server.
  const submitCreateUser = useCallback(() => {
    const createUser = async () => {
      if (
        turnstileToken &&
        userNameError.length == 0 &&
        passwordError.length == 0
      ) {
        const result = await makeCreateUserRequest(
          userName,
          password,
          turnstileToken,
        );
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
      } else {
        setLoginError(
          "Failed to authenticate with Cloudflare, try again later",
        );
      }
    };
    createUser();
  }, [
    userName,
    userNameError,
    password,
    passwordError,
    turnstileToken,
    setUserNameCookie,
  ]);

  const toggleLoginCreate = useCallback(() => {
    setSubmitIsCreate(!submitIsCreate);
  }, [submitIsCreate]);

  const formSubmit = useCallback(() => {
    if (submitIsCreate) {
      submitCreateUser();
    } else {
      submitLogin();
    }
  }, [submitIsCreate, submitCreateUser, submitLogin]);

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
      <form>
        <TextField
          name="username"
          type="text"
          variant="outlined"
          color="secondary"
          label="Username"
          helperText={userNameError}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          name="password"
          type="password"
          variant="outlined"
          color="secondary"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <SafeTurnstileWrapper />
        <Row>
          <Typography variant="caption">
            {submitIsCreate ? "Already have an account? " : "No account yet?"}
            <Link component="button" onClick={toggleLoginCreate}>
              {submitIsCreate ? "Login here" : "Create account"}
            </Link>
          </Typography>
          <Button disabled={submitButtonDisabled} onClick={formSubmit}>
            {submitIsCreate ? "Create Account" : "Log In"}
          </Button>
        </Row>
      </form>
      <Typography textAlign="center" color="red" variant="body1">
        {loginError}
      </Typography>
      <Typography variant="body1">
        {
          "Don't forget your username and password! Maybe write them down somewhere 😅"
        }
      </Typography>
    </Box>
  );
}
