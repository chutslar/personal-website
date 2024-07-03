"use client";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Main } from "../components/Main";
import type MysteryResponseData from "../types/MysteryResponseData";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useEffectOnce } from "react-use";
import createReducer from "../reducers/rosaryTrackerState/createReducer";
import { ReadonlyDeep } from "type-fest";
import type RosaryTrackerState from "../types/RosaryTrackerState";
import OActionType from "../reducers/rosaryTrackerState/enums/OActionType";
import type Mystery from "../types/Mystery";
import Image from "next/image";
import { fullRosary } from "../utils/Prayers";
import {
  Check,
  ChevronLeftSharp,
  ChevronRightSharp,
  Help,
  Info,
  MenuBook,
} from "@mui/icons-material";
import { getMysteryCategory } from "../utils/RosaryMysteries";
import Row from "../components/Row";
import { Vollkorn } from "next/font/google";
import {
  makeRosaryCompletedRequest,
  makeUserDataRequest,
} from "../components/utils/makeApiRequests";
import { useMounted } from "../hooks/useMounted";
import { getCookie } from "cookies-next";
import Link from "next/link";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import UserData from "../types/UserData";
import ParagraphsFromText from "../components/ParagraphsFromText";
import ReadingDialog from "../components/ReadingDialog";
import RosaryTrackerTitleWithHelp from "../components/RosaryTrackerTitleWithHelp";

dayjs.extend(utc);
dayjs.extend(tz);

const vollkorn = Vollkorn({ subsets: ["latin"] });

function initialState(): ReadonlyDeep<RosaryTrackerState> {
  return {
    date: new Date(),
    prayerIndex: 0,
    mysteryIndex: 0,
    isInteractive: false,
    hitDoneButton: false,
  };
}

function getMystery(
  state: ReadonlyDeep<RosaryTrackerState>,
): ReadonlyDeep<Mystery> | undefined {
  return state.mysteryResponseData?.mysteries[state.mysteryIndex];
}

function isLastMystery(state: ReadonlyDeep<RosaryTrackerState>): boolean {
  return state.mysteryIndex >= fullRosary.length - 1;
}

function isLastPrayer(state: ReadonlyDeep<RosaryTrackerState>): boolean {
  return state.prayerIndex >= fullRosary[state.mysteryIndex].length - 1;
}

export default function RosaryTracker() {
  const mounted = useMounted();
  const [state, dispatch] = useReducer(createReducer(), initialState());
  const currentMystery = useMemo(
    () => state.mysteryResponseData?.mysteries[state.mysteryIndex],
    [state],
  );
  const [isPrayerDialogOpen, setPrayerDialogOpen] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [userStreakMessage, setUserStreakMessage] = useState("");
  const [shouldIncrementStreak, setShouldIncrementStreak] = useState(true);

  useEffectOnce(() => {
    const fetchData = async () => {
      const mysteryCategory = getMysteryCategory(new Date());
      const response = await fetch(
        `/api/rosary/mystery?category=${mysteryCategory}`,
      );
      if (response.ok) {
        const mysteryResponseData: MysteryResponseData = await response.json();
        dispatch({
          type: OActionType.SetMysteryResponseData,
          mysteryResponseData,
        });
      }
    };
    fetchData();
  });

  useEffect(() => {
    if (mounted) {
      const userNameCookie = getCookie("userName");
      if (userNameCookie) {
        const requestUserData = async () => {
          const response = await makeUserDataRequest();
          if (response.status == 200) {
            const userData: UserData = await response.json();
            // Calculate the updated streak
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (userData.lastRosaryDate && userData.currentStreak) {
              const now = dayjs.utc().tz(timezone).startOf("day");
              const lastRosary = dayjs
                .utc(userData.lastRosaryDate)
                .tz(timezone)
                .startOf("day");
              const daysBetweenNowAndLastRosary = now.diff(lastRosary, "day");
              if (
                daysBetweenNowAndLastRosary > 1 ||
                daysBetweenNowAndLastRosary < 0
              ) {
                // Didn't do rosary yesterday, streak starts over
                setUserStreakMessage("Your new streak starts today!");
              } else if (daysBetweenNowAndLastRosary == 0) {
                setUserStreakMessage(
                  "You already prayed today, but you're always welcome to pray again",
                );
                setShouldIncrementStreak(false);
              } else {
                setUserStreakMessage(
                  `Keep your streak of ${userData.currentStreak} going!`,
                );
              }
            } else {
              setUserStreakMessage(
                "Pray your first rosary today, and start a new habit!",
              );
            }
            setUserName(userNameCookie);
          }
        };
        requestUserData();
      }
    }
  }, [mounted]);

  const onKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.code === "ArrowLeft") {
      dispatch({ type: OActionType.PreviousMystery });
    } else if (e.code === "ArrowRight") {
      dispatch({ type: OActionType.NextMystery });
    }
  };

  useEffectOnce(() => {
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
    };
  });

  const onDone = useCallback(() => {
    dispatch({ type: OActionType.HitDoneButton });
    const submitDone = async () => {
      if (userName && state.mysteryResponseData) {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timestamp = dayjs.utc().toISOString();
        const response = await makeRosaryCompletedRequest(
          timestamp,
          timeZone,
          state.mysteryResponseData.category,
        );
        if (response.status != 200) {
          setErrorMessage(
            "Sorry, we failed to update your progress. Try again later.",
          );
          dispatch({ type: OActionType.ReverseDoneButton });
        } else {
          const userStreakAsString: string = await response.json();
          const userStreak = parseInt(userStreakAsString, 10);
          if (!shouldIncrementStreak) {
            setUserStreakMessage("Enjoy your day, and may God bless you 🙏🏼");
          } else if (userStreak == 1) {
            setUserStreakMessage(
              "Great job! A journey of a thousand miles begins with a single step!",
            );
          } else {
            setUserStreakMessage(
              `Congrats! Your streak is now up to ${userStreak} days! Keep it going tomorrow!`,
            );
          }
          setErrorMessage("");
        }
      }
    };
    submitDone();
  }, [state, userName, setUserStreakMessage, shouldIncrementStreak]);

  return (
    <Main>
      <Box
        className="rosary-app-box"
        textAlign="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minWidth: "240px",
          alignItems: "center",
        }}
      >
        <RosaryTrackerTitleWithHelp />
        <Divider />
        {!state.hitDoneButton &&
          state.mysteryResponseData &&
          currentMystery && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                height: "100%",
                paddingTop: "6px",
              }}
            >
              {!userName && (
                <Link href="/account">
                  <Typography variant="subtitle1">
                    Sign in to save progress
                  </Typography>
                </Link>
              )}
              {userName && (
                <Typography variant="subtitle1">
                  Saving your progress as {userName}
                </Typography>
              )}
              <Box>
                <Typography variant="body1">
                  {dayjs(state.date).format("ddd MMM D")}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {state.mysteryResponseData.category}
                </Typography>
                <Typography variant="h6">{currentMystery.name}</Typography>
              </Box>
              {state.isInteractive && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: "400px",
                    justifyContent: "space-between",
                    alignSelf: "center",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      dispatch({ type: OActionType.PreviousPrayer })
                    }
                  >
                    <ChevronLeftSharp />
                  </IconButton>
                  <Row sx={{ justifyContent: "center" }}>
                    <Typography style={{ alignSelf: "end" }} variant="body1">
                      {fullRosary[state.mysteryIndex][state.prayerIndex].name}
                    </Typography>
                    <IconButton
                      style={{ color: "var(--primary-color)" }}
                      size="small"
                      onClick={() => setPrayerDialogOpen(true)}
                    >
                      <Info />
                    </IconButton>
                    <Dialog
                      open={isPrayerDialogOpen}
                      keepMounted
                      onClose={() => setPrayerDialogOpen(false)}
                      aria-describedby="prayer-dialog"
                    >
                      <DialogTitle sx={{ textAlign: "center" }}>
                        {fullRosary[state.mysteryIndex][state.prayerIndex].name}
                      </DialogTitle>
                      <DialogContent>
                        <Box
                          className={vollkorn.className}
                          sx={{ color: "var(--dark-grey)" }}
                        >
                          <ParagraphsFromText
                            text={
                              fullRosary[state.mysteryIndex][state.prayerIndex]
                                .text
                            }
                          />
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setPrayerDialogOpen(false)}>
                          <Typography variant="button">Close</Typography>
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Row>
                  <IconButton
                    onClick={() => dispatch({ type: OActionType.NextPrayer })}
                  >
                    <ChevronRightSharp />
                  </IconButton>
                </Box>
              )}
              {currentMystery.messages[0] && (
                <ReadingDialog currentMystery={currentMystery} />
              )}
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    disableRipple
                    disabled={state.mysteryIndex == 0}
                    sx={{ color: "black" }}
                    onClick={() =>
                      dispatch({ type: OActionType.PreviousMystery })
                    }
                  >
                    <ChevronLeftSharp />
                  </IconButton>
                  <Image
                    priority={true}
                    src={currentMystery.image.image}
                    style={{
                      maxHeight: "380px",
                      maxWidth: "min(500px, calc(100% - 60px))",
                      height: "auto",
                      width: "auto",
                      padding: "8px",
                    }}
                    alt="Image for Mystery"
                  />
                  <IconButton
                    disableRipple
                    disabled={isLastMystery(state)}
                    sx={{ color: "black" }}
                    onClick={() => dispatch({ type: OActionType.NextMystery })}
                  >
                    <ChevronRightSharp />
                  </IconButton>
                </Box>
                <Tooltip title={currentMystery.image.caption}>
                  <Typography
                    sx={{
                      ...vollkorn.style,
                      display: "block",
                      maxWidth: "340px",
                      textAlign: "start",
                    }}
                    variant="caption"
                  >
                    {currentMystery.image.caption}
                  </Typography>
                </Tooltip>
              </Card>
              <Row sx={{ justifyContent: "space-around" }}>
                <Tooltip title="Prayer Guide">
                  <IconButton
                    sx={{ color: "var(--primary-color)", paddingRight: "4px" }}
                    onClick={() =>
                      dispatch({ type: OActionType.ToggleInteractive })
                    }
                  >
                    <MenuBook />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Done">
                  <span>
                    <IconButton
                      sx={{ color: "var(--primary-color)", paddingLeft: "4px" }}
                      disabled={
                        state.hitDoneButton ||
                        !isLastMystery(state) ||
                        (state.isInteractive && !isLastPrayer(state))
                      }
                      onClick={onDone}
                    >
                      <Check />
                    </IconButton>
                  </span>
                </Tooltip>
              </Row>
            </Box>
          )}
        {userName && (
          <Typography variant="body1">{userStreakMessage}</Typography>
        )}
        {state.hitDoneButton && (
          <Card
            sx={{
              width: "300px",
              margin: "40px",
            }}
          >
            <Typography
              sx={{ ...vollkorn.style, padding: "10px", textAlign: "start" }}
              variant="h5"
            >
              <q>
                My soul magnifies the Lord, and my spirit rejoices in God my
                Savior
              </q>
            </Typography>
            <Typography sx={vollkorn.style} variant="subtitle2">
              - Luke 1:46-47
            </Typography>
          </Card>
        )}
        {userName && (
          <Typography noWrap variant="subtitle1">
            {"See all your stats on your "}{" "}
            <Link href="/account">account page</Link>
          </Typography>
        )}
        {state.hitDoneButton && !userName && (
          <Typography variant="subtitle1">
            {"Next time save your progress by creating an"}{" "}
            <Link href="/account">account</Link>
          </Typography>
        )}
        <Typography variant="body1" color="red">
          {errorMessage}
        </Typography>
      </Box>
    </Main>
  );
}
