import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";

export default function AddTraining({ fetchTrainings }) {
  const [training, setTraining] = useState({
    activity: "",
    date: null,
    duration: "",
    customer: "",
  });

  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchCustomers = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch" + response.statusText);
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTraining = () => {
    const dateTime = dayjs(training.date);
    const formattedDateTime = dateTime.toISOString();

    const formattedTraining = {
      ...training,
      date: formattedDateTime,
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
            <DateTimePicker
              label="Date and Time"
              value={training.date}
              onChange={(date) => setTraining({ ...training, date })}
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
