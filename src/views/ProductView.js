import React, { useEffect, useReducer } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import ProductService from "../services/product.service";
import Footer from "../components/Footer";
import FooterInfo from "../components/FooterInfo";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function ProductView() {
  const [{ loading, error, data }, dispatch] = useReducer(reducer, {
    data: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await ProductService.getAllProducts();
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.data.items });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="product_section layout_padding">
        <Container>
          <div className="heading_container heading_center">
            <h2>Our Products</h2>
          </div>
          <Row>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              data.map((product) => (
                <Product key={product._id} result={product} />
              ))
            )}
          </Row>
        </Container>
      </section>
      <FooterInfo />
      <Footer />
    </>
  );
}

export default ProductView;
