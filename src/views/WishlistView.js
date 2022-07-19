import React from "react";
import { Container } from "react-bootstrap";
import Wishlist from "../components/Wishlist";

function WishlistView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Wishlist</h2>
        </div>
        <Wishlist />
      </Container>
    </section>
  );
}

export default WishlistView;
