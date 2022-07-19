import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import "./Cart.css";
import MessageBox from "./MessageBox";

function Cart() {
  const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const {
    cart: { cartItems },
  } = state;

  const updateCart = (product, quantity) => {
    ctxDispatch({
      type: "ADD_CART_ITEM",
      payload: { ...product, quantity },
    });
  };

  const removeProduct = (product) => {
    ctxDispatch({ type: "REMOVE_CART_ITEM", payload: product });
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
                  <tr>
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
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Cart;
