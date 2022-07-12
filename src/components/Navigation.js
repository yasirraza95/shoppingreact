import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
	return (
		<div>
			 <header className="header_section">
      <div className="header_top">
        <div className="container-fluid">
          <div className="top_nav_container">
            <div className="contact_nav">
              <a href="">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span>
                  Call : +01 123455678990
                </span>
              </a>
              <a href="">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  Email : demo@gmail.com
                </span>
              </a>
            </div>
            <div className="search_form">
              <input type="text" className="form-control" placeholder="Search here..." />
              <button className="" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
            <div className="user_option_box">
              <a href="" className="account-link">
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>
                  My Account
                </span>
              </a>
              <a href="" className="cart-link">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>
                  Cart
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
      <div className="header_bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to={"/"}>
              <span>
                Minics
              </span>
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className=""> </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ">
                <li className={splitLocation[1] === "" ? "nav-item active" : "nav-item"}>
                  <Link className="nav-link" to={'/'}>Home</Link>
                </li>
                <li className={splitLocation[1] === "about" ? "nav-item active" : "nav-item"}>
                  <Link className="nav-link" to={'/about'}> About</Link>
                </li>
                <li className={splitLocation[1] === "product" ? "nav-item active" : "nav-item"}>
                  <Link className="nav-link" to={'/product'}>Products</Link>
                </li>
                <li className={splitLocation[1] === "why" ? "nav-item active" : "nav-item"}>
                  <Link className="nav-link" to={'why'}>Why Us</Link>
                </li>
                <li className={splitLocation[1] === "contact" ? "nav-item active" : "nav-item"}>
                  <Link className="nav-link" to={'/contact'}>Contact</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
		</div>
	)
}

export default Navigation
