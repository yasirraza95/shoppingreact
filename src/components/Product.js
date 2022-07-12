import React from "react";
import { Button, Col } from "react-bootstrap";

const addToCarHandler = () => {

};

function Product(props) {
  const { product } = props;
  return (
    <Col sm={6} lg={4} key = { product._id }>
      <div className="box">
        <div className="img-box">
          <img src = { product.image } alt="" />
          <Button className="add_cart_btn" onClick={() => addToCarHandler()}>
            <span>Add To Cart</span>
          </Button>
        </div>
        <div className="detail-box">
          <h5>{ product.name }</h5>
          <div className="product_info">
            <h5>
              <span>$</span> { product.price }
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
