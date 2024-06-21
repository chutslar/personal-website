"use client"; 
import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import { Main } from "../components/Main";
import type MysteryResponseData from "../types/MysteryResponseData";
import { KeyboardEvent, useMemo, useReducer } from "react";
import { useEffectOnce } from "react-use";
import { format, formatISO } from "date-fns";
import createReducer from "../reducers/rosaryTrackerState/createReducer";
import { ReadonlyDeep } from "type-fest";
import type RosaryTrackerState from "../types/RosaryTrackerState";
import OActionType from "../reducers/rosaryTrackerState/enums/OActionType";
import type Mystery from "../types/Mystery";
import Image from "next/image";
import { fullRosary } from "../utils/Prayers";
import { ChevronLeftSharp, ChevronRightSharp } from "@mui/icons-material";

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
  useEffectOnce(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/rosary/mystery?date=${formatISO(Date.now())}`);
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
        <Typography variant="h3">Rosary Tracker</Typography>
        <Divider />
        {state.mysteryResponseData && currentMystery &&
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
          }}>
            <Box>
              <Typography variant="body1">{format(state.date, "eee MMM d")}</Typography>
              <Typography variant="h5" fontWeight="bold">{state.mysteryResponseData.category}</Typography>
              <Typography variant="body1">{currentMystery.name}</Typography>
            </Box>
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
                    maxWidth: "500px",
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
          </Box>
        }
      </Box>
    </Main>
  );
}
