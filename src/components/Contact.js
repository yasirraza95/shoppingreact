import { useFormik, ErrorMessage } from "formik";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import UserService from "../services/user.service";

function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(25, "Maximum 25 characters allowed")
        .required("Enter name"),
      email: Yup.string()
        .email("Enter valid email address")
        .required("Enter email address"),
      subject: Yup.string()
        .max(50, "Maximum 50 characters allowed")
        .required("Enter address"),
      message: Yup.string()
        .max(1000, "Maximum 1000 characters allowed")
        .required("Enter message"),
    }),
    onSubmit: (values) => {
      UserService.contactUs(values.name, values.email, values.subject, values.message, "123");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <Row>
          <Col md={6}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              tabIndex="1"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}

            <br />            

            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
              tabIndex="3"
            />
            {formik.touched.subject && formik.errors.subject ? (
              <div className="error">{formik.errors.subject}</div>
            ) : null}
          </Col>

          <Col md={6}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              tabIndex="2"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <br />            

            <label htmlFor="message">Message</label>
            <input
              id="message"
              name="message"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              tabIndex="4"
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="error">{formik.errors.message}</div>
            ) : null}
          </Col>

          <div className="text-center">
              <br />            

            <button type="submit" className="btn btn-primary" tabIndex="5">
              Submit
            </button>
          </div>
        </Row>
      </Container>
    </form>
  );
}

export default Contact;
