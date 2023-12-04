import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

function TrainingCalendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch("http://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        // Process the data and update the state
        const formattedTrainings = data.map((training) => {
          const title = `${training.activity} / ${training.customer.firstname} ${training.customer.lastname} `;

          return {
            id: training.id,
            title: title,

            start: training.date.startDate,
            end: training.date.endDate,
          };
        });
        setTrainings(formattedTrainings);
      })
      .catch((error) => {
        console.error("Error fetching training data:", error);
      });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={trainings}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default TrainingCalendar;
