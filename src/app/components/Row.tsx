import { Box, SxProps, Theme } from "@mui/material"

export default function Row(props: {
  sx?: SxProps<Theme>,
  width?: string,
  children?: React.ReactNode,
}) {
  return (
    <Box sx={{
      ...props.sx,
      display: "flex",
      flexDirection: "row",
      width: props.width || "100%",
    }}>
      {props.children}
    </Box>
  )
}