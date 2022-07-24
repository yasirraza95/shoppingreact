import { createContext, useReducer } from "react";
import WishlistService from "../services/wishlist.service";
export const UserContext = createContext();
let userData = localStorage.getItem("userInfo");
const userToken = localStorage.getItem("token");

const initialState = {
  userInfo: userData ? JSON.parse(userData) : null,
  token: userToken ? JSON.parse(userToken) : null,
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  wishlistItems: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, userInfo: action.payload, token: action.token };
    case "UPDATE_PROFILE":
      return { ...state, userInfo: action.payload };
    case "LOGOUT":
      return { ...state, userInfo: null };
    case "ADD_CART_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "REMOVE_CART_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CLEAR_CART":
      localStorage.setItem("cartItems", []);
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    // case "ADD_WISHLIST_ITEM":
    //   const newWishItem = action.payload;
    //   const existWishItem = state.wishlist.wishlistItems.find(
    //     (item) => item._id === newWishItem._id
    //   );
    //   const wishlistItems = existWishItem
    //     ? state.wishlist.wishlistItems.map((item) =>
    //         item._id === existWishItem._id ? newWishItem : item
    //       )
    //     : [...state.wishlist.wishlistItems, newWishItem];
    //   localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    //   return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
    // case "REMOVE_WISHLIST_ITEM": {
    //   const wishlistItems = state.wishlist.wishlistItems.filter(
    //     (item) => item._id !== action.payload._id
    //   );
    //   localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    //   return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
    // }
    // case "CLEAR_WISHLIST":
    //   return { ...state, wishlist: { ...state.wishlist, wishlistItems: [] } };
    default:
      return state;
  }
}

export function UserProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
