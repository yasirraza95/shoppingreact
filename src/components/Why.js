import React from "react";
import { Container } from "react-bootstrap";
import './Why.css';

function Why() {
  return (
    <section className="why_us_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Why Choose Us</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="box ">
              <div className="img-box">
                <img src="images/w1.png" alt="" />
              </div>
              <div className="detail-box">
                <h5>Fast Delivery</h5>
                <p>variations of passages of Lorem Ipsum available</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box ">
              <div className="img-box">
                <img src="images/w2.png" alt="" />
              </div>
              <div className="detail-box">
                <h5>Free Shiping</h5>
                <p>variations of passages of Lorem Ipsum available</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box ">
              <div className="img-box">
                <img src="images/w3.png" alt="" />
              </div>
              <div className="detail-box">
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
