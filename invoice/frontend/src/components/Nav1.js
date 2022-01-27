import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Nav1() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ZOHO MOBILE SHOPPE</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard" style={{ color: "white" }}>
              DASHBOARD
            </Nav.Link>
            <Nav.Link href="/addinvoice" style={{ color: "white" }}>
              PRODUCT DETAILS
            </Nav.Link>
            <Nav.Link href="/generatepdf" style={{ color: "white" }}>
              GENERATE PDF
            </Nav.Link>
            <Nav.Link onClick={() => logout()} style={{ color: "white" }}>
              LOGOUT
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
