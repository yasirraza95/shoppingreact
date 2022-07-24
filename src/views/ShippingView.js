import React from "react";
import { Container } from "react-bootstrap";
import Shipping from "../components/Shipping";

function ShippingView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Shipping Information</h2>
        </div>
        <Shipping />
      </Container>
    </section>
  );
}

export default ShippingView;
