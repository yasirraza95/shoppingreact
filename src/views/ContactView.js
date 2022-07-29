import React from "react";
import { useFormik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import UserService from "../services/user.service";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Button from "../components/Button";

function ContactView() {
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
    onSubmit: (values, actions) => {
      const id = toast.loading("Please wait, while your message is being sent");
      UserService.contactUs(
        values.name,
        values.email,
        values.subject,
        values.message
      )
        .then((response) => {
          toast.update(id, {
            render: response.data.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          actions.resetForm();
        })
        .catch((err) => {
          toast.update(id, {
            render: err,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        });
    },
  });

  return (
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Contact Us</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Container>
            <Row>
              <Col md={6}>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  tabIndex="1"
                >
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </Input>

                <br />

                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  label="Subject"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subject}
                  tabIndex="3"
                >
                  {formik.touched.subject && formik.errors.subject ? (
                    <div className="error">{formik.errors.subject}</div>
                  ) : null}
                </Input>
              </Col>

              <Col md={6}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  tabIndex="2"
                >
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </Input>

                <br />

                <Input
                  id="message"
                  name="message"
                  type="text"
                  label="Message"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  tabIndex="4"
                >
                  {formik.touched.message && formik.errors.message ? (
                    <div className="error">{formik.errors.message}</div>
                  ) : null}
                </Input>
              </Col>

              <div className="text-center">
                <br />

                <Button type="submit" className="btn btn-primary" tabIndex="5">
                  Submit
                </Button>
              </div>
            </Row>
          </Container>
        </form>
      </Container>
    </section>
  );
}

export default ContactView;
