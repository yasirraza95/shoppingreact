import React from "react";
import { Container } from "react-bootstrap";
import Signup from "../components/Signup";

function SignupView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Signup</h2>
        </div>
        <Signup />
      </Container>
    </section>
  );
}

export default SignupView;
