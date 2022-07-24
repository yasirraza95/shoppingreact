import React, { useContext, useEffect, useReducer, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import WishlistService from "../services/wishlist.service";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

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

function Wishlist() {
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
                      No product found{console.log(error)}
                    </MessageBox>
                  </td>
                </tr>
              ) : (
                data.map(
                  (result) => (
                    // console.log(result),
                    (
                      <tr key={result.prod_id._id}>
                        <td>
                          <img
                            src={result.prod_id.image}
                            alt={result.prod_id.name}
                          />
                        </td>
                        <td>{result.prod_id.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => deleteWishlist(result._id)}
                          >
                            Delete
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-primary"
                            onClick={() => addToCart(result)}
                          >
                            Move to Cart
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )
              )}
            </tbody>
          </table>
        </Row>
      </Container>
    </div>
  );
}

export default Wishlist;
