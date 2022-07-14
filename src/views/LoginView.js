import React from "react";
import { Container } from "react-bootstrap";
import Login from "../components/Login";

function LoginView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Login</h2>
        </div>
        <Login />
      </Container>
    </section>
  );
}

export default LoginView;
