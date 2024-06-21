import { AppBar, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "./MainDrawer";
import Link from "next/link";

export function MainAppBar() {
  return <AppBar
    position="fixed"
    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
  >
    <Toolbar>
      <Link href="/">
        <Typography variant="h6" noWrap component="div">
          Christian Hutslar
        </Typography>
      </Link>
    </Toolbar>
  </AppBar>;
}
