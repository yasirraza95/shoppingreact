import React, { useContext } from "react";
import { Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Navigation.css";

function Navigation() {
  const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const { userInfo, cart } = state;
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const logoutHandler = () => {
    ctxDispatch({ type: "LOGOUT" });
    localStorage.removeItem("userInfo");
  };

  return (
    <div>
      <header className="header_section">
        <div className="header_top">
          <div className="container-fluid">
            <div className="top_nav_container">
              <div className="contact_nav">
                <a href="">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>Call : +01 123455678990</span>
                </a>
                <a href="">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>Email : demo@gmail.com</span>
                </a>
              </div>
              <div className="search_form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
                <button className="" type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
              {userInfo ? (
                <div className="user_option_box">
                  <Link to={"/profile"} className="account-link">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span>{userInfo.name}</span>
                  </Link>
                  <Link to={"/wishlist"} className="cart-link">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    <span>
                      Wishlist
                      <Badge pill bg="success">
                        1
                      </Badge>
                    </span>
                  </Link>
                  <Link to={"/cart"} className="cart-link">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>
                      Cart
                      {cart.cartItems.length > 0 && (
                        <Badge pill bg="success">
                          {cart.cartItems.length}
                        </Badge>
                      )}
                    </span>
                  </Link>
                  <Link to={"/orders"} className="cart-link">
                    <i className="fa fa-first-order" aria-hidden="true"></i>
                    <span>Orders</span>
                  </Link>
                  <Link to="/" onClick={logoutHandler} className="cart-link">
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span>Logout</span>
                  </Link>
                </div>
              ) : (
                <div className="user_option_box">
                  <Link to="/login" className="cart-link">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                    <span>Login</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="header_bottom">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <Link className="navbar-brand" to={"/"}>
                <span>Minics</span>
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className=""> </span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ">
                  <li
                    className={
                      splitLocation[1] === "" ? "nav-item active" : "nav-item"
                    }
                  >
                    <Link className="nav-link" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li
                    className={
                      splitLocation[1] === "about"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link className="nav-link" to={"/about"}>
                      {" "}
                      About
                    </Link>
                  </li>
                  <li
                    className={
                      splitLocation[1] === "product"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link className="nav-link" to={"/product"}>
                      Products
                    </Link>
                  </li>
                  <li
                    className={
                      splitLocation[1] === "why"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link className="nav-link" to={"why"}>
                      Why Us
                    </Link>
                  </li>
                  <li
                    className={
                      splitLocation[1] === "contact"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link className="nav-link" to={"/contact"}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navigation;
