import React from "react";
import { Container } from "react-bootstrap";
import Thankyou from "../components/Thankyou";

function ThankyouView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Order Information</h2>
        </div>
        <Thankyou />
      </Container>
    </section>
  );
}

export default ThankyouView;
