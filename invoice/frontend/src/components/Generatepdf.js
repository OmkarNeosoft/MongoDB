import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import Nav1 from "./Nav1";
import { getInvoice } from "../config/MyService";
// import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { sendMail } from "../config/MyService";

const ref = React.createRef();

export default function Generatepdf() {
  const [state, setState] = useState([]);
  const [items, setItems] = useState([]);
  let id = JSON.parse(localStorage.getItem("invoicenumber"));
  useEffect(() => {
    getInvoice().then((res) => {
      console.log(id);
      const match = res.data.filter((data) => {
        console.log(id);
        console.log(data.innumber);
        if (data.innumber === id) {
          console.log(data);
          let product = [];
          data.items.forEach((ele) => {
            product.push(ele);
          });
          setItems(product);
          return data;
        }
      });
      setState(match);
    });
  }, []);
  console.log(state);
  console.log(items);
  console.log(ref);

  const generatePdf = () => {
    const input = document.getElementById("divToPrint");
    console.log(input);
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL(
        "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
      );
      pdf.addImage(img, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  const sendmail = () => {
    const input = document.getElementById("divToPrint");
    console.log(input);
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL(
        "https://sm.pcmag.com/pcmag_ap/review/z/zoho-invoi/zoho-invoice_wr3r.jpg"
      );
      pdf.addImage(img, "JPEG", 0, 0);
      const filedata = pdf.output("blob");
      console.log(filedata);
      let formData = new FormData();
      formData.append("file", filedata, "samplefile");
      sendMail(formData).then((res) => {
        console.log(res);
        console.log("in response");
      });
      console.log("call finished");
    });
  };

  return (
    <div>
      <Nav1 />
      <br />

      <br />
      <Container

        ref={ref}
        id="divToPrint"
      >
        <div style={{ backgroundColor: "lightgray" }}>
          <Row>
            <Col md={9}>
              <div style={{ marginLeft: "50px" }}>
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVeWdYy_31d7NDiV38_qwkh4JpXOZtNactmw&usqp=CAU"
                  width="180px"
                  height="162px"
                />
              </div>
            </Col>
            <Col md={3}><br/>
              <h2 style={{ fontSize: "25px", marginRight: "300px" }}>
                ZOHO BUSINESS INVOICE
              </h2>
              <p style={{marginRighr: "300px" }}>INVOICE COUNT: {id}</p>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col md={9}>
              <p>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  <br/>
                  FROM :
                </span>
                <br />
                <span style={{ fontWeight: "bold" }}> ZOHO MOBILE SHOPEE</span>
                <br />
                mbshop@zoho.com
                <br />
                8888888888{" "}
              </p>
              <br />
              <p>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  BILL TO
                </span>
                <br />
                {state.map((value, index) => {
                  return (
                    <>
                      <span style={{ fontWeight: "bold" }}>
                        {value.recname}
                      </span>
                      <br />
                      {value.recemail}
                      <br />
                      {value.recmobile}
                      <br />
                      {value.recaddress}
                    </>
                  );
                })}
              </p>
            </Col>
            <Col md={3}>
              {state.map((value, index) => {
                return (
                  <div>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        STATUS
                      </span>
                      <br />
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {value.status}
                      </span>
                      <br />
                    </p>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        DATE
                      </span>
                      <br />
                      <span style={{ fontWeight: "bold" }}>{value.indate}</span>
                      <br />
                    </p>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        DUE DATE
                      </span>
                      <br />
                      <span style={{ fontWeight: "bold" }}>
                        {value.duedate}
                      </span>
                      <br />
                    </p>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        AMOUNT
                      </span>
                      <br />
                      <span style={{ fontWeight: "bold" }}>
                        &#8377; {value.total}
                      </span>
                      <br />
                    </p>
                  </div>
                );
              })}
            </Col>
          </Row>
        </div>
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>NUMBER</th>
                <th>TITLE</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>DISCOUNT (%)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.title}</td>
                    <td>{value.quantity}</td>
                    <td>&#8377; {value.price}</td>
                    <td>{value.discount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>
            {" "}
            * TERMS AND CONDITIONS APPLY
          </span>
          <br />
          PAYMENT OF INVOICES IS DUE BY THE DUE DATE SPECIFIED, OR IT MAY BE
          SUBJECT TO LATE PAYMENT FEES OR INTEREST CHARGES.{" "}
        </div>
        <br />
      </Container>
        <div className="text-center"><br/>
          <Button variant="info" onClick={() => generatePdf()}>
            DOWNLOAD PDF
          </Button>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          <Button variant="info" onClick={() => sendmail()}>
            SHARE PDF
          </Button>
        </div>
    </div>
    
  );
}
