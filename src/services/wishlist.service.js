import axios from "axios";
import api from "../interceptors/api";
// const API_URL = "https://shoppingnode-yasir.herokuapp.com";
const API_URL = "http://localhost:9000";

const viewUserWishlist = async(id, token) => {
  // return await axios.get(API_URL + "/wishlist/get/" + id, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  return api.get("/wishlist/get/" + id);
};

const checkExistence = (user_id, prod_id, token) => {
  return axios.post(
    API_URL + "/wishlist/existItem",
    {
      user_id,
      prod_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const addWishlist = (user_id, prod_id, token) => {
  return axios.post(
    API_URL + "/wishlist/add",
    {
      user_id,
      prod_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteWishlistById = (id, token) => {
  return axios.delete(API_URL + "/wishlist/delete/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteUserWishlist = (id, token) => {
  return axios.delete(API_URL + "/wishlist/deleteUserWishlist/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const WishlistService = {
  viewUserWishlist,
  checkExistence,
  addWishlist,
  deleteWishlistById,
  deleteUserWishlist,
};

export default WishlistService;
