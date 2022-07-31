import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import UserService from "../services/user.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FooterInfo from "../components/FooterInfo";

function ForgotView() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const { state } = useContext(UserContext);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter valid email address")
        .required("Enter email address"),
    }),
    onSubmit: (values, actions) => {
      const id = toast.loading("Please wait, requested is being generated");
      UserService.forgotPassword(values.email)
        .then((response) => {
          toast.update(id, {
            render: response.data.message,
            type: "success",
            isLoading: false,
            autoClose: 1000,
            pauseOnHover: false,
            closeOnClick: true,
          });
        })
        .catch((err) => {
          let result = err.response.message;

          toast.update(id, {
            render: result,
            type: "error",
            isLoading: false,
            autoClose: 2000,
            pauseOnHover: false,
            closeOnClick: true,
          });
          actions.resetForm();
        });
    },
  });
  return (
    <>
      <section className="product_section layout_padding">
        <Container>
          <div className="heading_container heading_center">
            <h2>Forgot</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Container>
              <Row>
                <Col md={3}></Col>
                <Col md={6}>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    label="Email"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    tabIndex="1"
                  >
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </Input>
                </Col>
                <Col md={3}></Col>

                <div className="text-center">
                  <br />

                  <Button
                    type="submit"
                    className="btn btn-primary"
                    tabIndex="2"
                  >
                    Submit
                  </Button>
                </div>
              </Row>
            </Container>
          </form>
        </Container>
      </section>
      <FooterInfo />
      <Footer />
    </>
  );
}

export default ForgotView;
