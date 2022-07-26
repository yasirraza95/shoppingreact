import React from "react";
import { Container } from "react-bootstrap";
import AdminLogin from "../components/AdminLogin";

function AdminLoginView() {
  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Admin Panel</h2>
        </div>
        <AdminLogin />
      </Container>
    </section>
  );
}

export default AdminLoginView;
