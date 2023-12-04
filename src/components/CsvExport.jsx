import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "@mui/material";

function CsvExport({ data }) {
  const csvData = data.map((customer) => [
    customer.firstname,
    customer.lastname,
    customer.streetaddress,
    customer.postcode,
    customer.city,
    customer.email,
    customer.phone,
  ]);

  return (
    <CSVLink data={csvData} filename={"customer-list.csv"}>
      <Button>Export CSV</Button>
    </CSVLink>
  );
}

export default CsvExport;
