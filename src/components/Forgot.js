import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import UserService from "../services/user.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

function Forgot() {
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
      const id = toast.loading(
        "Please wait, requested is being generated"
      );
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
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              tabIndex="1"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

          </Col>
          <Col md={3}></Col>

          <div className="text-center">
            <br />

            <button type="submit" className="btn btn-primary" tabIndex="2">
              Submit
            </button>

          </div>
        </Row>
      </Container>
    </form>
  );
}

export default Forgot;
