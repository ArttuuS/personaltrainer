import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";

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
