import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddCustomer({ fetchCustomers }) {
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveCustomer = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Error when adding customer: " + response.statusText);

        fetchCustomers();
      })
      .catch((err) => console.error(err));

    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            variant="standard"
            value={customer.firstname}
            onChange={(e) =>
              setCustomer({ ...customer, firstname: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            variant="standard"
            value={customer.lastname}
            onChange={(e) =>
              setCustomer({ ...customer, lastname: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Streetaddress"
            fullWidth
            variant="standard"
            value={customer.streetaddress}
            onChange={(e) =>
              setCustomer({ ...customer, streetaddress: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Postcode"
            fullWidth
            variant="standard"
            value={customer.postcode}
            onChange={(e) =>
              setCustomer({ ...customer, postcode: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
