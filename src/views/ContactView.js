import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Contact from "../components/Contact";

function ContactView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Contact Us</h2>
        </div>
        <Contact />
      </Container>
    </section>
  );
}

export default ContactView;
