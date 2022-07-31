import React, { useContext, useEffect, useReducer, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import WishlistService from "../services/wishlist.service";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "../components/Button";
import Input from "../components/Input";
import Image from "../components/Image";
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

function WishlistView() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const { token, userInfo } = state;
  const [{ loading, error, data }, dispatch] = useReducer(reducer, {
    data: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const fetchData = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await WishlistService.viewUserWishlist(
        userInfo.userId,
        token
      );
      console.log(result.data.data.wishlist.length);
      dispatch({ type: "FETCH_SUCCESS", payload: result.data.data.wishlist });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: err.message });
    }
  };

  const addToCart = (product) => {};

  const deleteWishlist = (id) => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = WishlistService.deleteWishlistById(id, token);
      dispatch({ type: "FETCH_SUCCESS", payload: result.data.data.wishlist });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="product_section layout_padding">
        <Container>
          <div className="heading_container heading_center">
            <h2>Wishlist</h2>
          </div>
          <div>
            <Container>
              <Row>
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td>
                          <LoadingBox />
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td>
                          <MessageBox variant="danger">
                            No product found
                          </MessageBox>
                        </td>
                      </tr>
                    ) : (
                      data.map((wishlist) => (
                        <tr key={wishlist.result.prod_id._id}>
                          <td>
                            <Image
                              src={wishlist.result.prod_id.image}
                              alt={wishlist.result.prod_id.name}
                            />
                          </td>
                          <td>{wishlist.result.prod_id.name}</td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              onClick={() =>
                                deleteWishlist(wishlist.result._id)
                              }
                            >
                              Delete
                            </Button>
                            &nbsp;
                            <Button
                              className="btn btn-primary"
                              onClick={() => addToCart(wishlist.result)}
                            >
                              Move to Cart
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </Row>
            </Container>
          </div>
        </Container>
      </section>
      <FooterInfo />
      <Footer />
    </>
  );
}

export default WishlistView;
