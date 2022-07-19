import React from "react";
import { Container } from "react-bootstrap";
import Cart from "../components/Cart";

function CartView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Cart</h2>
        </div>
        <Cart />
      </Container>
    </section>
  );
}

export default CartView;
