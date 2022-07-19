import React, { useContext } from "react";
import { Button, Col } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Product(props) {
  const { result } = props;
  const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const {
    cart: { cartItems },
  } = state;

  const addToCarHandler = (product) => {
    const existProduct = cartItems.find((x) => x._id === result._id);
    const quantity = existProduct ? existProduct.quantity + 1 : 1;
    if(quantity == 1) {
      ctxDispatch({ type: "ADD_CART_ITEM", payload: { ...product, quantity } });
      toast("Added to cart", {autoClose: 1000, pauseOnHover: false, closeOnClick: true});
    } else {
      toast("Quantity increased", {autoClose: 1000, pauseOnHover: false, closeOnClick: true});
    }
    return;
  };

  return (
    <Col sm={6} lg={4}>
      <div className="box">
        <div className="img-box">
          <img src={result.image} alt="" />
          <Button
            className="add_cart_btn"
            onClick={() => addToCarHandler(result)}
          >
            <span>Add To Cart</span>
          </Button>
        </div>
        <div className="detail-box">
          <h5>{result.name}</h5>
          <div className="product_info">
            <h5>
              <span>$</span> {result.price}
            </h5>
            <div className="star_container">
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default Product;
