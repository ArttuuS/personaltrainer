import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Traininglist from "./Traininglist";
import Customerlist from "./Customerlist";
import TrainingCalendar from "./Calender";
import Statistics from "./Statistics";

function TabApp() {
  const [value, setValue] = useState("customerlist");

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="customerlist" label="Customer" />
        <Tab value="traininglist" label="Training" />
        <Tab value="trainingcalendar" label="Calender" />
        <Tab value="statistics" label="Statistics" />
      </Tabs>

      {value === "customerlist" && <Customerlist />}
      {value === "traininglist" && <Traininglist />}
      {value === "trainingcalendar" && <TrainingCalendar />}
      {value === "statistics" && <Statistics />}
    </div>
  );
}

export default TabApp;
