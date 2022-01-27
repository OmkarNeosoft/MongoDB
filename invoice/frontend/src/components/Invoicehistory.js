import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Nav1 from "./Nav1";
import { getInvoice } from "../config/MyService";

export default function Invoicehistory() {
  const [state, setState] = useState([]);

  useEffect(() => {
    getInvoice().then((res) => {
      setState(res.data);
    });
  });
  return (
    <div>
      <Nav1 />
      <br />
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>NUMBER</th>
              <th>NAME</th>
              <th>INVOICE NUMBER</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {state.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.recname}</td>
                  <td>{value.innumber}</td>
                  <td>{value.status}</td>
                  <td>
                    <Button variant="info">EDIT</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
