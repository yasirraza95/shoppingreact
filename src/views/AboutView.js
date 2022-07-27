import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import About from "../components/About";
import Footer from "../components/Footer";
import FooterInfo from "../components/FooterInfo";

function AboutView() {
  return (
    <>
      <About />
      <FooterInfo />
      <Footer />
    </>
  );
}

export default AboutView;
