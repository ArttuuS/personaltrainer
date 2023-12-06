import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";

function AddTrainingForCustomer({ customerUrl }) {
  const [training, setTraining] = useState({
    activity: "",
    date: null,
    time: null,
    duration: "",
    customer: customerUrl,
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTraining = () => {
    training.customer = customerUrl;

    const isoDate = moment(training.date).format("YYYY-MM-DD");

    const isoTimeString = moment(training.time, "hh:mm A").format(
      "HH:mm:ss.SSS"
    );

    const isoDateTimeWithTime = `${isoDate}T${isoTimeString}`;

    const formattedTraining = {
      ...training,
      date: isoDateTimeWithTime,
    };

    fetch("https://traineeapp.azurewebsites.net/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formattedTraining),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Error when adding training: " + response.statusText);
      })
      .catch((err) => console.error(err));

    handleClose();
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={training.date}
              onChange={(date) => setTraining({ ...training, date })}
              textField={(props) => <TextField {...props} fullWidth />}
            />
            <TimePicker
              label="Time"
              value={training.time}
              onChange={(time) => setTraining({ ...training, time })}
              textField={(props) => <TextField {...props} fullWidth />}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Duration (minutes)"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTrainingForCustomer;
