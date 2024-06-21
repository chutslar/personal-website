import type RosaryTrackerState from "@/app/types/RosaryTrackerState";
import type { Reducer } from "react";
import type { ReadonlyDeep } from "type-fest";
import Action from "./Action";

type RosaryTrackerStateReducer = Reducer<ReadonlyDeep<RosaryTrackerState>, Action>

export default RosaryTrackerStateReducer;
