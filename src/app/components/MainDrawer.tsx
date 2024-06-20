import { Box, Drawer, Link, ListItem, Typography } from "@mui/material";

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
      },
    }}
    variant="permanent"
    anchor="left"
  >
    <Box padding="12px">
      {drawerItems.map(drawerItem => <ListItem key={drawerItem.key} disablePadding>
        <Link href={drawerItem.link} color="inherit" underline="hover"><Typography variant="h6">{drawerItem.title}</Typography></Link>
      </ListItem>
      )}
    </Box>
  </Drawer>;
}

