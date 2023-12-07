import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Traininglist from "./Traininglist";
import Customerlist from "./Customerlist";
import TrainingCalendar from "./Calender";
import Statistics from "./Statistics";

function TabApp() {
  const [value, setValue] = useState("customerlist");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerItems = [
    { value: "customerlist", label: "Customer" },
    { value: "traininglist", label: "Training" },
    { value: "trainingcalendar", label: "Calendar" },
    { value: "statistics", label: "Statistics" },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <h2>Personaltrainer App</h2>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {drawerItems.map((item) => (
            <ListItem
              button
              key={item.value}
              onClick={() => handleChange(item.value)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {value === "customerlist" && <Customerlist />}
      {value === "traininglist" && <Traininglist />}
      {value === "trainingcalendar" && <TrainingCalendar />}
      {value === "statistics" && <Statistics />}
    </div>
  );
}

export default TabApp;
