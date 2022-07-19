import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import UserService from "../services/user.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  function equalTo(ref, msg) {
    return this.test({
      name: "equalTo",
      exclusive: false,
      message: msg || "${path} must be the same as ${reference}",
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }

  Yup.addMethod(Yup.string, "equalTo", equalTo);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      name: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(25, "Maximum 25 characters allowed")
        .required("Enter username"),
      email: Yup.string()
        .email("Enter valid email address")
        .required("Enter email address"),
      name: Yup.string()
        .max(50, "Maximum 50 characters allowed")
        .required("Enter name"),
      phone: Yup.string()
        .min(10, "Minimum 10 numbers allowed")
        .max(10, "Maximum 10 numbers allowed")
        .required("Enter phone"),
      password: Yup.string()
        .max(25, "Maximum 25 characters allowed")
        .required("Enter password")
        .equalTo(Yup.ref("confirm_password"), "Passwords must be same"),
      confirm_password: Yup.string()
        .max(50, "Maximum 50 characters allowed")
        .required("Enter confirm password")
        .equalTo(Yup.ref("password"), "Passwords must be same"),
    }),
    onSubmit: (values, actions) => {
      const id = toast.loading("Please wait, your data is being uploaded");
      UserService.signup(
        values.name,
        values.username,
        values.email,
        values.phone,
        values.password
      )
        .then((response) => {
          toast.update(id, {
            render: response.data.message,
            type: "success",
            isLoading: false,
            autoClose: 1000,
            pauseOnHover: false,
            closeOnClick: true,
          });
          actions.resetForm();
        })
        .catch((err) => {
          let message = err;

          if (err.response.status === 422) {
            message = err.response.data.message;
          }

          toast.update(id, {
            render: message,
            type: "error",
            isLoading: false,
            autoClose: 2000,
            pauseOnHover: false,
            closeOnClick: true,
          });
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <Row>
          <Col md={6}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formik.values.username}
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tabIndex="1"
            />

            <br />

            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tabIndex="3"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}

            <br />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tabIndex="5"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </Col>
          <Col md={6}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tabIndex="2"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <br />
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="number"
              value={formik.values.phone}
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tabIndex="4"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : null}

            <br />

            <label htmlFor="password">Confirm Password</label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tabIndex="6"
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <div className="error">{formik.errors.confirm_password}</div>
            ) : null}
          </Col>

          <div className="text-center">
            <br />

            <button type="submit" className="btn btn-primary" tabIndex="6">
              Create Account
            </button>
            <br/><br/>
            <Link to={"/login"}>Already have an Account? Click here to Login</Link>
          </div>
        </Row>
      </Container>
    </form>
  );
}

export default Signup;
