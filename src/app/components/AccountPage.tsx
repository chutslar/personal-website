"use client";

import {
  Box,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

import LoginScreen from "./LoginScreen";
import { useMounted } from "../hooks/useMounted";
import { makeUserDataRequest } from "./utils/makeApiRequests";
import UserData from "../types/UserData";

dayjs.extend(utc);
dayjs.extend(tz);

const DATE_DISPLAY_FORMAT = "MMMM D, YYYY h:mm A";

function renderDateString(dateString?: string): string {
  if (!dateString) {
    return "N/A";
  }
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return dayjs.utc(dateString).tz(timeZone).format(DATE_DISPLAY_FORMAT);
}

export default function AccountPage() {
  const mounted = useMounted();
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [rememberedUserName, setRememberedUserName] = useState("");
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const logout = () => {
    setLoggedInUserName("");
  };
  useEffect(() => {
    if (mounted) {
      const userNameCookie = getCookie("userName");
      if (userNameCookie) {
        setRememberedUserName(userNameCookie);
        const requestUserData = async () => {
          const response = await makeUserDataRequest();
          if (response.status == 200) {
            setLoggedInUserName(userNameCookie);
            setUserData(await response.json());
          }
        };
        requestUserData();
      }
    }
  }, [mounted]);
  return (
    <Box
      sx={{
        maxWidth: "700px",
        height: "100%",
      }}
    >
      <Typography variant="h4" align="center">
        {loggedInUserName ? "Your Data" : "Sign In"}
      </Typography>
      <Divider />
      <Box
        sx={{
          height: "100%",
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
            {userData && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: "300px" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell>First Rosary</TableCell>
                      <TableCell>
                        {renderDateString(userData.firstRosaryDate)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Most Recent Rosary</TableCell>
                      <TableCell>
                        {renderDateString(userData.lastRosaryDate)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Rosaries Completed</TableCell>
                      <TableCell>{userData.totalRosaries || 0}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Current Rosary Streak</TableCell>
                      <TableCell>{userData.totalRosaries || 0}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <Link component="button" variant="body1" onClick={logout}>
              Sign out
            </Link>
          </Box>
        )}
        {!loggedInUserName && (
          <LoginScreen
            rememberedUserName={rememberedUserName}
            setLoggedInUserName={setLoggedInUserName}
          />
        )}
      </Box>
    </Box>
  );
}
