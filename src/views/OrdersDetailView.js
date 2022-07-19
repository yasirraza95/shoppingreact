import React from "react";
import { Container } from "react-bootstrap";
import OrdersDetail from "../components/OrdersDetail";

function OrdersDetailView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Order Detail</h2>
        </div>
        <OrdersDetail />
      </Container>
    </section>
  );
}

export default OrdersDetailView;
