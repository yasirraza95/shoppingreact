import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import OrderService from "../services/order.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import Button from "../components/Button";
import Input from "../components/Input";
import Footer from "../components/Footer";
import FooterInfo from "../components/FooterInfo";

function ShippingView() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/cart";

  const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const { userInfo, token, cart } = state;

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
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
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

          const thank = response.data.data.response;

          ctxDispatch({ type: "THANKYOU", payload: { thank } });
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
    <>
      <section className="product_section layout_padding">
        <Container>
          <div className="heading_container heading_center">
            <h2>Shipping Information</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Container>
              <Row>
                <Col md={3}></Col>
                <Col md={6}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    className="form-control"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    tabIndex="1"
                  >
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </Input>
                  <br />
                  <Input
                    id="phone"
                    name="phone"
                    type="number"
                    label="Phone"
                    value={formik.values.phone}
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    tabIndex="2"
                  >
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="error">{formik.errors.phone}</div>
                    ) : null}
                  </Input>
                  <br />

                  <Input
                    id="address"
                    name="address"
                    type="text"
                    label="Address"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    tabIndex="3"
                  >
                    {formik.touched.address && formik.errors.address ? (
                      <div className="error">{formik.errors.address}</div>
                    ) : null}
                  </Input>
                </Col>
                <Col md={3}></Col>

                <div className="text-center">
                  <br />

                  <Button
                    type="submit"
                    className="btn btn-primary"
                    tabIndex="4"
                  >
                    Place Order
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

export default ShippingView;
