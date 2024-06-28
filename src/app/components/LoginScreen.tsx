"use client";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SafeTurnstileWrapper } from "./SafeTurnstileWrapper";
import { useMounted } from "../hooks/useMounted";
import {
  makeCreateUserRequest,
  makeLoginRequest,
  makeTurnstileVerifyRequest,
} from "./utils/makeApiRequests";
import Row from "./Row";

const userNameRegex = /^[a-zA-Z\d\-_]+$/;
const passwordRegex = /^[a-zA-Z\d\-_!@#$%^&*]+$/;

export default function LoginScreen(props: {
  rememberedUserName: string;
  setLoggedInUserName: (userName: string) => void;
}) {
  const mounted = useMounted();
  // The username that the user inputs.
  const [userName, setUserName] = useState("");
  // The password that the user inputs.
  const [password, setPassword] = useState("");
  // True if the Cloudflare Turnstile returned a success, false otherwise.
  const [passedTurnstile, setPassedTurnstile] = useState(false);
  // True if the user started entering a username.
  const [touchedUsername, setTouchedUsername] = useState(false);
  // True if the user started entering a password.
  const [touchedPassword, setTouchedPassword] = useState(false);
  // True if the user is trying to create an account.
  const [submitIsCreate, setSubmitIsCreate] = useState(false);
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
  // The error message shown to the user when the password input is not valid.
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
    const submitTurnstileVerify = async () => {
      const response = await makeTurnstileVerifyRequest(token);
      if (response.status == 200) {
        setPassedTurnstile(true);
      }
    };
    submitTurnstileVerify();
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
        passedTurnstile &&
        userNameError.length == 0 &&
        passwordError.length == 0
      ) {
        const result = await makeCreateUserRequest(userName, password);
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
    passedTurnstile,
    setUserNameCookie,
  ]);

  // Toggles whether the user is trying to login or create an account.
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

  useEffect(() => {
    if (props.rememberedUserName.length) {
      setUserName(props.rememberedUserName);
    }
  }, [props.rememberedUserName]);

  return (
    <Box
      sx={{
        height: "min(100%, 400px)",
        minWidth: "280px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <TextField
          name="username"
          type="text"
          variant="outlined"
          color="secondary"
          label="Username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            setTouchedUsername(true);
          }}
          fullWidth
          required
        />
        {touchedUsername && (
          <Typography variant="body2" color="red">
            {userNameError}
          </Typography>
        )}
        <Box sx={{ margin: "12px 0px" }}>
          <TextField
            name="password"
            type="password"
            variant="outlined"
            color="secondary"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setTouchedPassword(true);
            }}
            fullWidth
            required
          />
          {touchedPassword && (
            <Typography variant="body2" color="red">
              {passwordError}
            </Typography>
          )}
        </Box>
        {submitIsCreate && !passedTurnstile && <SafeTurnstileWrapper />}
        <Button disabled={submitButtonDisabled} onClick={formSubmit}>
          {submitIsCreate ? "Create Account" : "Log In"}
        </Button>
        <Box>
          <Typography variant="caption">
            {submitIsCreate ? "Already have an account? " : "No account yet?"}
            <Link
              sx={{ paddingLeft: "4px" }}
              component="button"
              onClick={toggleLoginCreate}
            >
              {submitIsCreate ? "Login here" : "Create account"}
            </Link>
          </Typography>
        </Box>
      </Box>
      <Typography textAlign="center" color="red" variant="body1">
        {loginError}
      </Typography>
      {submitIsCreate && (
        <Typography variant="body1">
          {"Don't forget your username and password! I recommend "}
          <Link href="https://bitwarden.com/">Bitwarden</Link>
          {" or another password manager"}
        </Typography>
      )}
    </Box>
  );
}
