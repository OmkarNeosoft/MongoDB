import React, { useState, useEffect } from "react";
import Nav1 from "./Nav1";
import { Container, Col, Card, Row, Button } from "react-bootstrap";
import { getInvoice } from "../config/MyService";
import { useNavigate } from "react-router";
import png from "./bca.jpg";
export default function Dashboard() {
  const navigate = useNavigate();
  let [total, setTotal] = useState(0);
  let [paid, setPaid] = useState(0);
  let [unpaid, setUnpaid] = useState(0);
  let [partpaid, setPartpaid] = useState(0);
  useEffect(() => {
    getInvoice().then((res) => {
      res.data.forEach((element) => {
        if (element.status === "Unpaid") {
          unpaid += 1;
          setUnpaid(unpaid);
        } else if (element.status === "Paid") {
          paid += 1;
          setPaid(paid);
        } else if (element.status === "Partially Paid") {
          partpaid += 1;
          setPartpaid(partpaid);
        }
        total += 1;
        setTotal(total);
      });
    });
  }, []);

  return (
    <div style={{ backgroundImage: `url(${png})`, backgroundRepeat:"no-repeat", backgroundSize:"100% 200%" }}>
      <Nav1 />
      <br />
      <Container className="col-6" style={{ border: "1px solid black" }}>
        <Card style={{height:"200px"}}>
          
          <h4 className="text-center" style={{ backgroundColor: "pink" }}>
            TOTAL GENERATED INVOICE
          </h4>
          <hr />
          <Row>
            <Card.Text className="text-center" style={{ fontSize: "30px" }}>
              {total}
            </Card.Text>
          </Row>
          <br />
          <br />

          <Button
            className="btn-info"
            onClick={() => navigate("/invoicehistory")}
          >
            ALL INVOICES
          </Button>
        </Card>
        <br />
        <br />
        <br />
        <Card >
          <h4 className="text-center" style={{ backgroundColor: "pink" }}>
            INVOICES STATUS
          </h4>
          <hr />
          {/* <Col>
                        <Card
                            style={{
                                width: "20rem",
                                backgroundColor: "white",
                            }}
                        >
                            <Card.Body className="text-success">
                                <Card.Title>Paid</Card.Title>
                                <Card.Text>{paid}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            style={{
                                width: "20rem",
                                backgroundColor: "white",
                            }}
                        >
                            <Card.Body className="text-warning">
                                <Card.Title>Partially Paid</Card.Title>
                                <Card.Text>{partpaid}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    <br/>
                    <br/>

          <Row>
            <Card.Body className="text-center">
              <Card.Title>TOTAL PAID INVOICES</Card.Title>
              <Card.Text style={{ fontSize: "30px" }}>{unpaid}</Card.Text>
            </Card.Body>
          </Row>
        </Card>
        <br />
      </Container>
    </div>
  );
}
