import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import OrderService from "../services/order.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Shipping() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/cart";

  const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const { userInfo, token, cart } = state;
console.log(cart.cartItems.length);
  useEffect(() => {
    if (!userInfo || cart.cartItems.length == 0) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter valid email address")
        .required("Enter email address"),
      phone: Yup.string()
        .min(10, "Enter valid mobile no.")
        .max(10, "Enter valid mobile no.")
        .required("Enter phone"),
      address: Yup.string()
        .min(10, "Minimum 10 characters required")
        .required("Enter address"),
    }),
    onSubmit: (values, actions) => {
      const id = toast.loading("Please wait, order is being placed");
      OrderService.placeOrder(
        userInfo.userId,
        values.address,
        values.email,
        values.phone,
        "123", //FIXME
        cart.cartItems,
        token
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
          ctxDispatch({ type: "CLEAR_CART" });
          actions.resetForm();
          navigate("/thankyou");
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
          <Col md={3}></Col>
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
              tabIndex="2"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : null}

            <br />

            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tabIndex="3"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="error">{formik.errors.address}</div>
            ) : null}
          </Col>
          <Col md={3}></Col>

          <div className="text-center">
            <br />

            <button type="submit" className="btn btn-primary" tabIndex="4">
              Place Order
            </button>
          </div>
        </Row>
      </Container>
    </form>
  );
}

export default Shipping;
