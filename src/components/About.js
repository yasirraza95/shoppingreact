import React from "react";
import { Row } from "react-bootstrap";
import "./About.css";

function About() {
  return (
    <div className="sub_page">
      <section className="about_section">
        <div className="container-fluid">
          <Row>
            <div className="col-md-5 ml-auto">
              <div className="detail-box pr-md-3">
                <div className="heading_container">
                  <h2>We Provide Best For You</h2>
                </div>
                <p>
                  Totam architecto rem beatae veniam, cum officiis adipisci
                  soluta perspiciatis ipsa, expedita maiores quae accusantium.
                  Animi veniam aperiam, necessitatibus mollitia ipsum id optio
                  ipsa odio ab facilis sit labore officia! Repellat expedita,
                  deserunt eum soluta rem culpa. Aut, necessitatibus cumque.
                  Voluptas consequuntur vitae aperiam animi sint earum, ex unde
                  cupiditate, molestias dolore quos quas possimus eveniet
                  facilis magnam? Vero, dicta.
                </p>
              </div>
            </div>
            <div className="col-md-6 px-0">
              <div className="img-box">
                <img src="images/about-img.jpg" alt="" />
              </div>
            </div>
          </Row>
        </div>
      </section>
    </div>
  );
}

export default About;
