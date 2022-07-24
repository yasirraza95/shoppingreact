import axios from "axios";

// const API_URL = "https://shoppingnode-yasir.herokuapp.com";
const API_URL = "http://localhost:9000";

const viewUserWishlist = (id, token) => {
  return axios.get(API_URL + "/wishlist/get/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
