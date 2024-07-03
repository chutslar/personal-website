import type { ReadonlyDeep } from "type-fest";
import { Box } from "@mui/material";
import RosaryLine from "../assets/rosary_line.svg";
import RosaryTrackerState from "../types/RosaryTrackerState";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { getTotalPrayerIndex } from "../utils/Prayers";

const offsetXByTotalPrayerIndex = [
  0, 0, 64, 97, 120, 143, 156, 174, 283, 305, 328, 352, 375, 399, 423, 446, 469,
  492, 506, 506, 523, 554, 577, 600, 623, 646, 671, 694, 718, 741, 764, 778,
  778, 795, 824, 846, 869, 893, 915, 940, 963, 987, 1010, 1033, 1047, 1047,
  1064, 1095, 1117, 1140, 1164, 1187, 1211, 1235, 1258, 1281, 1304, 1317, 1317,
  1336, 1367, 1388, 1412, 1435, 1458, 1482, 1506, 1529, 1552, 1576, 1591, 1591,
  1633, 1865,
] as const;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default function RosaryProgress(props: {
  state: ReadonlyDeep<RosaryTrackerState>;
}) {
  const { height } = useWindowDimensions();
  const [offsetX, adjustOffsetX] = useReducer(
    (state: number, target: number) => {
      return state < target
        ? Math.min(target, state + 2)
        : Math.max(target, state - 2);
    },
    0,
  );
  const targetOffsetX = useMemo(() => {
    return offsetXByTotalPrayerIndex[
      getTotalPrayerIndex(props.state.mysteryIndex, props.state.prayerIndex)
    ];
  }, [props.state.mysteryIndex, props.state.prayerIndex]);
  const animate = useCallback(() => {
    if (offsetX != targetOffsetX) {
      adjustOffsetX(targetOffsetX);
      requestAnimationFrame(animate);
    }
  }, [offsetX, adjustOffsetX, targetOffsetX]);
  useEffect(() => {
    requestAnimationFrame(animate);
  }, [animate, targetOffsetX]);
  return (
    <Box>
      <RosaryLine
        viewBox={`${offsetX - 100} 0 300 160`}
        width={300}
        height={height > 1000 ? 160 : 100}
        style={{ border: "2px black dashed", borderRadius: "22px" }}
      />
    </Box>
  );
}
