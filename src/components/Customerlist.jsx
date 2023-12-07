import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTrainingForCustomer from "./AddTrainingForCustomer";
import CsvExport from "./CsvExport";
import DeleteIcon from "@mui/icons-material/Delete";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch" + response.statusText);
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchCustomers();
          else throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch((err) => console.error(err));
    }
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

  const columnDefs = [
    { field: "firstname", sortable: true, filter: true, width: 150 },
    { field: "lastname", sortable: true, filter: true, width: 150 },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true, width: 120 },
    { field: "city", sortable: true, filter: true, width: 120 },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <EditCustomer fetchCustomers={fetchCustomers} data={params.data} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => deleteCustomer(params.data.links[0].href)}
        ></Button>
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <AddTrainingForCustomer customerUrl={params.data.links[0].href} />
      ),
      width: 150,
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

      <AddCustomer fetchCustomers={fetchCustomers} />
      <CsvExport data={customers}></CsvExport>
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
