import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import UserService from "../services/user.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

function LoginView() {
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
          ctxDispatch({
            type: "LOGIN",
            payload: response.data.data,
            token: response.data.token,
          });
          ctxDispatch({
            type: "THANKYOU",
            payload: []
          });
          
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
    <section className="product_section layout_padding">
      <Container>
        <div className="heading_container heading_center">
          <h2>Login</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Container>
            <Row>
              <Col md={3}></Col>
              <Col md={6}>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  tabIndex="1"
                >
                  {formik.touched.username && formik.errors.username ? (
                    <div className="error">{formik.errors.username}</div>
                  ) : null}
                </Input>
                <br />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  tabIndex="2"
                >
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </Input>
              </Col>
              <Col md={3}></Col>

              <div className="text-center">
                <br />
                <Button type="submit" className="btn btn-primary" tabIndex="3">
                  Login
                </Button>

                <br />
                <br />

                <Link to={"/signup"}>New User? Create Account</Link>
                <br />
                <br />

                <Link to={"/forgot"}>Forgot Password? Click here</Link>
              </div>
            </Row>
          </Container>
        </form>
      </Container>
    </section>
  );
}

export default LoginView;
