import { createContext, useReducer } from "react";
export const UserContext = createContext();
let userData = localStorage.getItem("userInfo");
let userThank = localStorage.getItem("thankyou");
const userToken = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshtoken");

const initialState = {
  userInfo: userData ? JSON.parse(userData) : null,
  thankyou: userThank ? JSON.parse(userThank) : null,
  token: userToken ? JSON.parse(userToken) : null,
  token: refreshToken ? JSON.parse(refreshToken) : null,
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
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(action.token));
      localStorage.setItem("refreshToken", JSON.stringify(action.refreshToken));
      return {
        ...state,
        userInfo: action.payload,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    case "UPDATE_TOKEN":
      localStorage.setItem("token", JSON.stringify(action.token));
      return {
        ...state,
        token: action.token
      };
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
    case "THANKYOU":
      localStorage.setItem("thankyou", JSON.stringify(action.payload));
      return { ...state, thankyou: action.payload };
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
