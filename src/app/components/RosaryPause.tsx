import { ReadonlyDeep } from "type-fest";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Pause } from "@mui/icons-material";
import type RosaryTrackerState from "../types/RosaryTrackerState";
import { makeRosaryPauseRequest } from "./utils/makeApiRequests";
import Row from "./Row";
import {
  getMystery,
  getMysteryForIndex,
  isLastMystery,
  isLastMysteryIndex,
} from "../utils/RosaryTrackerStateUtils";

export default function RosaryPause(props: {
  state: ReadonlyDeep<RosaryTrackerState>;
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [pauseSucceeded, setPauseSucceeded] = useState<boolean | undefined>(
    undefined,
  );
  const [pauseInProgress, setPauseInProgress] = useState(false);
  const [useNextMystery, setUseNextMystery] = useState<boolean | undefined>(
    undefined,
  );
  const [shouldConfirm, setShouldConfirm] = useState(false);

  const onPause = useCallback(() => {
    const submitPause = async () => {
      if (props.state.mysteryResponseData && props.state.mysteryIndex > 0) {
        setPauseInProgress(true);
        const response = await makeRosaryPauseRequest(
          props.state.mysteryResponseData.category,
          useNextMystery
            ? props.state.mysteryIndex + 1
            : props.state.mysteryIndex,
        );
        setPauseInProgress(false);
        setPauseSucceeded(response.status == 200);
      }
    };
    submitPause();
  }, [props.state, useNextMystery]);

  return (
    <Tooltip title="Pause">
      <span>
        <IconButton
          sx={{
            color: "var(--primary-color)",
            paddingRight: "4px",
          }}
          onClick={() => {
            setDialogOpen(true);
            setPauseSucceeded(undefined);
          }}
          disabled={
            !props.state.mysteryResponseData ||
            props.state.mysteryIndex < 1 ||
            isLastMystery(props.state)
          }
        >
          <Pause />
        </IconButton>
        <Dialog
          open={isDialogOpen}
          keepMounted
          onClose={() => {
            if (!pauseInProgress) {
              setDialogOpen(false);
            }
          }}
          aria-describedby="prayer-dialog"
        >
          <DialogTitle>Pause Rosary</DialogTitle>
          <DialogContent
            sx={{
              alignContent: "center",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            {useNextMystery === undefined &&
              !isLastMysteryIndex(props.state.mysteryIndex + 1) && (
                <Box>
                  <p>Did you finish the</p>
                  <p>
                    <strong>{`${getMystery(props.state)?.name}`}</strong>
                  </p>
                  <p>mystery?</p>
                  <Row sx={{ justifyContent: "space-around" }}>
                    <Button
                      onClick={() => {
                        setUseNextMystery(true);
                        setShouldConfirm(true);
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => {
                        setUseNextMystery(false);
                        setShouldConfirm(true);
                      }}
                    >
                      No
                    </Button>
                  </Row>
                </Box>
              )}
            {shouldConfirm && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                <p></p>
                <p>{`If you pause, next time you start a ${props.state.mysteryResponseData?.category} mystery, you'll pray the opening prayers and then pray the`}</p>
                <p>
                  <strong>
                    {`${
                      getMysteryForIndex(
                        props.state,
                        useNextMystery
                          ? props.state.mysteryIndex + 1
                          : props.state.mysteryIndex,
                      )?.name
                    }`}
                  </strong>
                </p>
                <p>mystery.</p>
                <Button
                  onClick={() => {
                    setShouldConfirm(false);
                    onPause();
                  }}
                >
                  Confirm
                </Button>
              </Box>
            )}
            {useNextMystery === undefined &&
              isLastMysteryIndex(props.state.mysteryIndex + 1) && (
                <Box>
                  <Typography>
                    This is the last mystery; do you want to save your progress
                    and start with this one next time?
                  </Typography>
                  <Row>
                    <Button
                      onClick={() => {
                        setUseNextMystery(false);
                        onPause();
                      }}
                    >
                      Yes
                    </Button>
                  </Row>
                </Box>
              )}
            {pauseInProgress && <CircularProgress />}
            {pauseSucceeded && <p>Progress saved!</p>}
            {pauseSucceeded === false && (
              <p color="red">
                Sorry, your progress couldn&quot;t be saved. Wait and try again
                later.
              </p>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDialogOpen(false)}
              disabled={pauseInProgress}
            >
              {pauseSucceeded ? "Close" : "Cancel"}
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    </Tooltip>
  );
}
