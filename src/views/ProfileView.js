import React from "react";
import { Container } from "react-bootstrap";
import Profile from "../components/Profile";

function ProfileView() {
  return (
    <div>
      <section className="product_section layout_padding">
        <Container>
          <div className="heading_container heading_center">
            <h2>Profile</h2>
          </div>
          <Profile />
        </Container>
      </section>
    </div>
  );
}

export default ProfileView;
