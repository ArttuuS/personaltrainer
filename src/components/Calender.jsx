import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

function TrainingCalendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        const formattedTrainings = data.map((training) => {
          const customerName = training.customer
            ? `${training.customer.firstname} ${training.customer.lastname}`
            : "Unknown Customer";
          const startDate = new Date(training.date);
          const endDate = new Date(
            startDate.getTime() + training.duration * 60000
          );

          const title = `${training.activity} / ${customerName}`;

          return {
            id: training.id,
            title: title,

            start: startDate,
            end: endDate,
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
