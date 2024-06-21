import { AppBar, Box, Divider, Drawer, Link, ListItem, Paper, Toolbar, Typography } from "@mui/material";

export const drawerWidth = 240;

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

export function MainDrawer() {
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
    variant="permanent"
    anchor="left"
    PaperProps={{
      sx: {
        background: "var(--primary-color-dark)",
        color: "white",
      }
    }}
  >
    <Box className="drawer-box">
      {drawerItems.map(drawerItem => <ListItem key={drawerItem.key} disablePadding>
        <Link href={drawerItem.link} color="inherit" underline="hover"><Typography variant="h6">{drawerItem.title}</Typography></Link>
      </ListItem>
      )}
    </Box>
  </Drawer>;
}

