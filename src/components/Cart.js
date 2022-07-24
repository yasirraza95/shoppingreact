import React, { useContext, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Cart.css";
import MessageBox from "./MessageBox";

function Cart() {
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
                      <img src={product.image} />
                    </td>
                    <td>{product.name}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        disabled={product.quantity === 1}
                        onClick={() =>
                          updateCart(product, product.quantity - 1)
                        }
                      >
                        -
                      </button>
                      {product.quantity}
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          updateCart(product, product.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.price * product.quantity}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => removeProduct(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Row>
          <Row>
            <div style={{ textAlign: "right" }}>
              <b>
                Total: {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </b>
              <br />
              <Button
                className="add_cart_btn"
                onClick={() => shippingHandler()}
              >
                <span>Place Order</span>
              </Button>
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Cart;
