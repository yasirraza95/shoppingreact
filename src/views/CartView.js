import React, { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./CartView.css";
import MessageBox from "../components/MessageBox";
import Image from "../components/Image";
import Footer from "../components/Footer";
import FooterInfo from "../components/FooterInfo";

function CartView() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const {
    cart: { cartItems },
    userInfo,
  } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const updateCart = (product, quantity) => {
    ctxDispatch({
      type: "ADD_CART_ITEM",
      payload: { ...product, quantity },
    });
  };

  const removeProduct = (product) => {
    ctxDispatch({ type: "REMOVE_CART_ITEM", payload: product });
  };

  const shippingHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <section className="product_section layout_padding">
        <Container>
          <div className="heading_container heading_center">
            <h2>Cart</h2>
          </div>
          <div>
            {cartItems.length === 0 ? (
              <MessageBox>No products in cart</MessageBox>
            ) : (
              <Container>
                <Row>
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <Image src={product.image}></Image>
                          </td>
                          <td>{product.name}</td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              disabled={product.quantity === 1}
                              onClick={() =>
                                updateCart(product, product.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            {product.quantity}
                            <Button
                              className="btn btn-primary"
                              onClick={() =>
                                updateCart(product, product.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </td>
                          <td>{product.price}</td>
                          <td>{product.price * product.quantity}</td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              onClick={() => removeProduct(product)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>
                <Row>
                  <div style={{ textAlign: "right" }}>
                    <b>
                      Total:{" "}
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </b>
                    <br />
                    <Button
                      className="btn btn-primary"
                      onClick={() => shippingHandler()}
                    >
                      <span>Place Order</span>
                    </Button>
                  </div>
                </Row>
              </Container>
            )}
          </div>
        </Container>
      </section>
      <FooterInfo />
      <Footer />
    </>
  );
}

export default CartView;
