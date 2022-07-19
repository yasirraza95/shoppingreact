import React from "react";
import { Container } from "react-bootstrap";
import Forgot from "../components/Forgot";

function ForgotView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Forgot</h2>
        </div>
        <Forgot />
      </Container>
    </section>
  );
}

export default ForgotView;
