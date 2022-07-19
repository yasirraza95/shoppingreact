import { useFormik } from "formik";
import * as Yup from "yup";
import UserService from "../services/user.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Profile() {
  const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const { userInfo } = state;
  const { token } = state;

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";


  useEffect(() => {
    if (!userInfo && !token) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo, token]);

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
  };

  Yup.addMethod(Yup.string, 'equalTo', equalTo);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: userInfo.username,
      email: userInfo.email,
      name: userInfo.name,
      phone: userInfo.phone,
      // password: "",
      // confirm_password: "",
    },
    validationSchema: Yup.object({
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
      // password: Yup.string()
      //   .max(25, "Maximum 25 characters allowed")
      //   .required("Enter password")
      //   .equalTo(Yup.ref('confirm_password'), "Passwords must be same"),
      // confirm_password: Yup.string()
      //   .max(50, "Maximum 50 characters allowed")
      //   .required("Enter confirm password")
      //   .equalTo(Yup.ref('password'), "Passwords must be same"),
    }),
    onSubmit: (values, actions) => {
      const id = toast.loading(
        "Please wait, while your information is being updated to the system"
      );
      UserService.updateProfile(userInfo.userId, values.name, values.phone, token)
        .then((response) => {
          toast.update(id, {
            render: "Profile updated",
            type: "success",
            isLoading: false,
            autoClose: 1000,
            pauseOnHover: false,
            closeOnClick: true,
          });
          // console.log(JSON.stringify(response.data.data));
          ctxDispatch({ type: "UPDATE_PROFILE", payload: response.data.data });
          localStorage.setItem("userInfo", JSON.stringify(response.data.data));
          // navigate(redirect || "/");
          // actions.resetForm();
        })
        .catch((err) => {
          let result = "";
          if (err.response.status === 401) {
            result = "Username or password is invalid";
          } else {
            result = err.message;
          }

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
          <Col md={6}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formik.values.username}
              className="form-control"
              disabled={true}
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
              tabIndex="2"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}

            <br />

            {/* <label htmlFor="password">Password</label>
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
            ) : null} */}
          </Col>
          <Col md={6}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              disabled={true}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tabIndex="1"
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
              tabIndex="3"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : null}

            <br />

            {/* <label htmlFor="password">Confirm Password</label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tabIndex="5"
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <div className="error">{formik.errors.confirm_password}</div>
            ) : null} */}
          </Col>

          <div className="text-center">
            <br />

            <button type="submit" className="btn btn-primary" tabIndex="6">
              Update Profile
            </button>
          </div>
        </Row>
      </Container>
    </form>
  );
}

export default Profile;
