import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";

export default function AddTraining({ fetchTrainings }) {
  const [training, setTraining] = React.useState({
    activity: "",
    date: null,
    time: null,
    duration: "",
    customer: "",
  });

  const [customers, setCustomers] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const fetchCustomers = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch" + response.statusText);
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    fetchCustomers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTraining = () => {
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

        fetchTrainings();
      })
      .catch((err) => console.error(err));

    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
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
          <TextField
            select
            margin="dense"
            label="Customer"
            fullWidth
            variant="standard"
            value={training.customer}
            onChange={(e) =>
              setTraining({ ...training, customer: e.target.value })
            }
          >
            {customers.map((customer, index) => (
              <MenuItem
                key={`${customer.id}-${index}`}
                value={customer.links[0].href}
              >
                {customer.firstname} {customer.lastname}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
