import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  const fetchTrainings = () => {
    fetch("http://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch" + response.statusText);
      })
      .then((data) => setTrainings(data.content))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const [columnDefs] = useState([
    { field: "activity", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    { field: "duration", sortable: true, filter: true },
  ]);

  return (
    <>
      <div className="ag-theme-material" style={{ width: "100%", height: 800 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default Traininglist;
