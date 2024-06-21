import { AppBar, Box, Divider, Drawer, IconButton, Link, ListItem, Paper, Toolbar, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

export const drawerWidth = "240px";

export const drawerItems = [
  {
    key: "about_me",
    title: "About Me",
    link: "/about-me"
  },
  {
    key: "rosary_tracker",
    title: "Rosary Tracker",
    link: "#"
  }
]

export function MainDrawer(props: {drawerState: boolean, toggleDrawerState: React.Dispatch<React.SetStateAction<boolean>>}) {
  return <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        borderRightWidth: 2,
      },
    }}
    open={props.drawerState}
    variant="temporary"
    anchor="left"
    PaperProps={{
      sx: {
        background: "var(--primary-color-dark)",
        color: "white",
      }
    }}
  >
    <Box className="drawer-box" display="flex" justifyContent="flex-end" flexDirection="column">
      <IconButton style={{width: "min-content", alignSelf: "end"}} onClick={() => props.toggleDrawerState(false)}>
        <ChevronLeft style={{width: "24px"}} />
      </IconButton>
      {drawerItems.map(drawerItem => <ListItem key={drawerItem.key} disablePadding>
        <Link href={drawerItem.link} color="inherit" underline="hover"><Typography variant="h6">{drawerItem.title}</Typography></Link>
      </ListItem>
      )}
    </Box>
  </Drawer>;
}

