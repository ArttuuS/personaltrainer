// Import necessary dependencies
import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import _ from "lodash";

// Define the Statistics component
function Statistics() {
  const [trainings, setTrainings] = useState([]); // Declare trainings state

  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch: " + response.statusText);
      })
      .then((data) => {
        const formattedTrainings = data.map((training) => ({
          ...training,
        }));
        setTrainings(formattedTrainings);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Use lodash to group trainings by activity and sum the duration
    const groupedByActivity = _.groupBy(trainings, "activity");
    const activityData = Object.keys(groupedByActivity).map((activity) => ({
      activity,
      duration: _.sumBy(groupedByActivity[activity], "duration"),
    }));

    setActivityData(activityData);
  }, [trainings]);

  // Define the chart component
  const renderChart = (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={activityData}>
        <XAxis dataKey="activity" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <h2>Activity Distribution Over Time</h2>
      {activityData.length > 0 ? renderChart : <p>No data available</p>}
    </div>
  );
}

export default Statistics;
