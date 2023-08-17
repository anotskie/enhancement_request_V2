import React from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar className="navbar navbar-expand-lg bg-body-tertiary">
      <Container>
        <Row className="align-items-center">
          <Col xs="auto" style={{ marginBottom: "2px", display: "flex" }}>
            <h1
              style={{
                background: "linear-gradient(to right, #007BFF, #001F3F)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: "bold",
                margin: 0,
                padding: "10px 0",
              }}
            >
              Chadix.
            </h1>
          </Col>
          <Col
            className="ml-auto"
            style={{ marginTop: "30px", display: "flex" }}
          >
            <h3>Chadix ideas</h3>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;