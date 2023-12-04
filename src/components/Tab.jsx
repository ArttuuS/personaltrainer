import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Traininglist from "./Traininglist";
import Customerlist from "./Customerlist";
import TrainingCalendar from "./Calender";

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
      </Tabs>

      {value === "customerlist" && <Customerlist />}
      {value === "traininglist" && <Traininglist />}
      {value === "trainingcalendar" && <TrainingCalendar />}
    </div>
  );
}

export default TabApp;
