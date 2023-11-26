import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Traininglist from "./Traininglist";
import Customerlist from "./Customerlist";

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
      </Tabs>

      {value === "customerlist" && <Customerlist />}
      {value === "traininglist" && <Traininglist />}
    </div>
  );
}

export default TabApp;
