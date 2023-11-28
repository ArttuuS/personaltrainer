import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
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

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    gridApi.setQuickFilter(event.target.value);
  };

  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
  ]);

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
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          onGridReady={onGridReady}
        />
      </div>
    </>
  );
}

export default Customerlist;
