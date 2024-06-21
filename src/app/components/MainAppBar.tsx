import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "./MainDrawer";
import Link from "next/link";
import { Menu } from "@mui/icons-material";

export function MainAppBar(props: {toggleDrawerState: React.Dispatch<React.SetStateAction<boolean>>}) {
  return <AppBar
    position="fixed"
    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
  >
    <Toolbar>
      <IconButton onClick={() => props.toggleDrawerState(true)}>
        <Menu />
      </IconButton>
      <Link href="/">
        <Typography variant="h6" paddingLeft="48px" noWrap component="div">
          Christian Hutslar
        </Typography>
      </Link>
    </Toolbar>
  </AppBar>;
}
