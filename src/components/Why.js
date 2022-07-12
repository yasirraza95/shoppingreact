import React from "react";
import { Container } from "react-bootstrap";
import './Why.css';

function Why() {
  return (
    <section class="why_us_section layout_padding">
      <Container>
        <div class="heading_container heading_center">
          <h2>Why Choose Us</h2>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="box ">
              <div class="img-box">
                <img src="images/w1.png" alt="" />
              </div>
              <div class="detail-box">
                <h5>Fast Delivery</h5>
                <p>variations of passages of Lorem Ipsum available</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="box ">
              <div class="img-box">
                <img src="images/w2.png" alt="" />
              </div>
              <div class="detail-box">
                <h5>Free Shiping</h5>
                <p>variations of passages of Lorem Ipsum available</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="box ">
              <div class="img-box">
                <img src="images/w3.png" alt="" />
              </div>
              <div class="detail-box">
                <h5>Best Quality</h5>
                <p>variations of passages of Lorem Ipsum available</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Why;
