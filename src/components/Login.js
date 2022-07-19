import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import UserService from "../services/user.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Login() {
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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(25, "Maximum 25 characters allowed")
        .required("Enter username"),
      password: Yup.string()
        .max(25, "Maximum 25 characters allowed")
        .required("Enter password"),
    }),
    onSubmit: (values, actions) => {
      const id = toast.loading(
        "Please wait, while you are being logged in to the system"
      );
      UserService.login(values.username, values.password)
        .then((response) => {
          toast.update(id, {
            render: "You have been logged into the system",
            type: "success",
            isLoading: false,
            autoClose: 1000,
            pauseOnHover: false,
            closeOnClick: true,
          });
          ctxDispatch({ type: "LOGIN", payload: response.data.data, token: response.data.token });
          localStorage.setItem("userInfo", JSON.stringify(response.data.data));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          navigate(redirect || "/");
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
          <Col md={3}></Col>
          <Col md={6}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              tabIndex="1"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
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
              value={formik.values.password}
              tabIndex="2"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </Col>
          <Col md={3}></Col>

          <div className="text-center">
            <br />

            <button type="submit" className="btn btn-primary" tabIndex="3">
              Login
            </button>
            
            <br/><br/>
            
            <Link to={"/signup"}>New User? Create Account</Link>
            <br/><br/>
            
            <Link to={"/forgot"}>Forgot Password? Click here</Link>
          </div>
        </Row>
      </Container>
    </form>
  );
}

export default Login;
