import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import AddTraining from "./AddTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTrainings = () => {
    fetch("http://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch: " + response.statusText);
      })
      .then((data) => {
        const formattedTrainings = data.map((training) => ({
          ...training,
          date: dayjs(training.date).format("DD.MM.YYYY HH:mm"),
        }));
        setTrainings(formattedTrainings);
      })
      .catch((err) => console.error(err));
  };

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) fetchTrainings();
          else throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    gridApi.setQuickFilter(event.target.value);
  };

  const columnDefs = [
    { field: "activity", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    { field: "duration", sortable: true, filter: true },
    {
      field: "customer.firstname",
      sortable: true,
      filter: true,
      headerName: "First Name",
    },
    {
      field: "customer.lastname",
      sortable: true,
      filter: true,
      headerName: "Last Name",
    },
    {
      cellRenderer: (params) => (
        <Button size="small" onClick={() => deleteTraining(params.data.id)}>
          Delete
        </Button>
      ),
      width: 120,
    },
  ];

  return (
    <>
      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearchTermChange}
        />
      </div>
      <AddTraining fetchTrainings={fetchTrainings} />
      <div className="ag-theme-material" style={{ width: "100%", height: 800 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          onGridReady={onGridReady}
        />
      </div>
    </>
  );
}

export default Traininglist;
