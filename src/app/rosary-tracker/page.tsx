"use client"; 
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Typography } from "@mui/material";
import { Main } from "../components/Main";
import type MysteryResponseData from "../types/MysteryResponseData";
import { KeyboardEvent, useCallback, useMemo, useReducer, useState } from "react";
import { useEffectOnce } from "react-use";
import { format, formatISO } from "date-fns";
import createReducer from "../reducers/rosaryTrackerState/createReducer";
import { ReadonlyDeep } from "type-fest";
import type RosaryTrackerState from "../types/RosaryTrackerState";
import OActionType from "../reducers/rosaryTrackerState/enums/OActionType";
import type Mystery from "../types/Mystery";
import Image from "next/image";
import { fullRosary } from "../utils/prayers";
import { ChevronLeftSharp, ChevronRightSharp, Info } from "@mui/icons-material";
import { getMysteryCategory } from "../utils/rosaryMysteries";
import Row from "../components/Row";
import { Chivo_Mono } from "next/font/google";

const chivo = Chivo_Mono({ subsets: ["latin"] });

function initialState(): ReadonlyDeep<RosaryTrackerState> {
  return {
    date: new Date(),
    prayerIndex: 0,
    mysteryIndex: 0,
    isInteractive: false,
    hitDoneButton: false,
  };
}

function getMystery(state: ReadonlyDeep<RosaryTrackerState>): ReadonlyDeep<Mystery> | undefined {
  return state.mysteryResponseData?.mysteries[state.mysteryIndex];
}

function isLastMystery(state: ReadonlyDeep<RosaryTrackerState>) : boolean {
  return state.mysteryIndex >= (fullRosary.length - 1);
}

function isLastPrayer(state: ReadonlyDeep<RosaryTrackerState>): boolean {
  return state.prayerIndex >= (fullRosary[state.mysteryIndex].length - 1);
}

export default function RosaryTracker() {
  const [state, dispatch] = useReducer(createReducer(), initialState());
  const currentMystery = useMemo(() => state.mysteryResponseData?.mysteries[state.mysteryIndex], [state]);
  const [isPrayerDialogOpen, setPrayerDialogOpen] = useState(false);

  useEffectOnce(() => {
    const fetchData = async () => {
      const mysteryCategory = getMysteryCategory(new Date());
      const response = await fetch(`/api/rosary/mystery?category=${mysteryCategory}`);
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

  const onKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.code === "ArrowLeft") {
      dispatch({type: OActionType.PreviousMystery});
    } else if (e.code === "ArrowRight") {
      dispatch({type: OActionType.NextMystery});
    }
  }

  useEffectOnce(() => {
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
    }
  });

  return (
    <Main>
      <Box textAlign="center" sx={{ height: "100%" }}>
        <Typography variant="h5">Rosary Tracker</Typography>
        <Divider />
        {state.mysteryResponseData && currentMystery &&
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            paddingTop: "6px",
          }}>
            <Box>
              <Typography variant="body1">{format(state.date, "eee MMM d")}</Typography>
              <Typography variant="h6" fontWeight="bold">{state.mysteryResponseData.category}</Typography>
              <Typography variant="body1">{currentMystery.name}</Typography>
            </Box>
            {state.isInteractive &&
              <Box sx={{
                display: "flex",
                flexDirection: "row",
                width: "400px",
                justifyContent: "space-between",
                alignSelf: "center",
              }}>
                <IconButton onClick={() => dispatch({type: OActionType.PreviousPrayer})}>
                  <ChevronLeftSharp />
                </IconButton>
                <Row sx={{justifyContent: "center"}}>
                  <Typography style={{alignSelf: "end"}} variant="body1">{fullRosary[state.mysteryIndex][state.prayerIndex].name}</Typography>
                  <IconButton style={{color: "var(--primary-color)"}} size="small" onClick={() => setPrayerDialogOpen(true)}>
                    <Info />
                  </IconButton>
                  <Dialog
                    open={isPrayerDialogOpen}
                    keepMounted
                    onClose={() => setPrayerDialogOpen(false)}
                    aria-describedby="prayer-dialog"
                  >
                    <DialogTitle>{fullRosary[state.mysteryIndex][state.prayerIndex].name}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="prayer-text">
                        <Typography variant="body2"><pre className={chivo.className}>{fullRosary[state.mysteryIndex][state.prayerIndex].text}</pre></Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setPrayerDialogOpen(false)}><Typography variant="button">Close</Typography></Button>
                    </DialogActions>
                  </Dialog>
                </Row>
                <IconButton onClick={() => dispatch({type: OActionType.NextPrayer})}>
                  <ChevronRightSharp />
                </IconButton>
              </Box>
            }
            <Card>
              <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
              }}>
                <IconButton 
                  disableRipple
                  disabled={state.mysteryIndex == 0}
                  sx={{ color: "black" }}
                  onClick={() => dispatch({type: OActionType.PreviousMystery})}
                >
                  <ChevronLeftSharp />
                </IconButton>
                <Image
                  priority={true}
                  src={currentMystery.image.image} 
                  style={{
                    maxHeight: "500px",
                    maxWidth: "min(500px, calc(100% - 60px))",
                    height: "auto",
                    width: "auto",
                    padding: "8px",
                  }} 
                  alt="Image for Mystery" />
                <IconButton
                  disableRipple 
                  disabled={isLastMystery(state)}
                  sx={{ color: "black" }}
                  onClick={() => dispatch({type: OActionType.NextMystery})}
                >
                  <ChevronRightSharp />
                </IconButton>
              </Box>
              <Typography sx={{display: "block", maxWidth: "400px"}} variant="caption">{currentMystery.image.caption}</Typography>
            </Card>
            <Row sx={{justifyContent:"space-around"}}>
              <Button sx={{background: "var(--primary-color)", color: "white"}} onClick={() => dispatch({type: OActionType.ToggleInteractive})}>
                <Typography variant="button">{state.isInteractive ? "Turn Walkthrough Off" : "Walk Me Through It"}</Typography>
              </Button>
              <Button
                sx={{background: "var(--primary-color)", color: "white"}}
                disabled={state.hitDoneButton || !isLastMystery(state) || (state.isInteractive && !isLastPrayer(state))}
                onClick={() => dispatch({type: OActionType.HitDoneButton})
              }>
                <Typography variant="button">Done</Typography>
              </Button>
            </Row>
          </Box>
        }
      </Box>
    </Main>
  );
}
