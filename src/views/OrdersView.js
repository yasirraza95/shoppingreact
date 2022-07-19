import React from "react";
import { Container } from "react-bootstrap";
import Orders from "../components/Orders";

function OrdersView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Orders</h2>
        </div>
        <Orders />
      </Container>
    </section>
  );
}

export default OrdersView;
