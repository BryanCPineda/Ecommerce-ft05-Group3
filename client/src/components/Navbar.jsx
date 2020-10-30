import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavbarGeneral.css";
import SearchBar from "./SearchBar/SearchBar";
import SignUp from "./Users/userRegister"; //importamos el componente UserRegister (menu modal)
import SignIn from "./Users/userLogin"; //importamos el componente UserLogin (menu modal)
import Logout from "./Users/Logout"; //importamos el componente Logout (boton)
import { Button, Row, Col, Container, Nav } from "react-bootstrap";
import { IoIosCart } from "react-icons/io";
import UserLoged from "./Users/UserLoged";
import AddReview from "./Reviews/AddReview";
import { connect } from "react-redux";
import UserProfile from "./Users/Profile";

function Navbar({ isAuthenticated, user }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const [state, setState] = useState({ modal: "" });
  function handleOpenLoginCloseReg() {
    setState({ modal: true });
  }

  const guest = (
    <div className="d-flex mt-3">
      <span>
        <SignIn state={state} />
      </span>
      <span className="ml-2">
        <SignUp handler={handleOpenLoginCloseReg} />
      </span>
    </div>
  );
 
  return (
    <nav class="background-al-nav-general navbar navbar-expand-lg navbar-light bg-light rounded">
      <Container className="d-flex justify-content-center">
        <Link to="/user/catalogo">
          <div class="logo">
            <img
              style={{ width: "150px", height: "150px" }}
              class="image-brand"
              src={"/images/brand4.png"}
              alt="logo"
            ></img>
          </div>
        </Link>
        <div className="admin-navbar-normal">
        {user && user.rol === "admin" ? (
          <div
            className="d-flex align-items-center"
            style={{ height: "50px", width: "70px", fontSize: "20px" }}
          >
            <Link to="/admin" class="nav-link admin-icono-navbar">
              Admin
            </Link>
          </div>
        ) : null}
        </div>
        <div className="searchbar-navbar">
          <SearchBar />
        </div>

        <button
          class="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarsExample09"
        >
          <div
            id="collapseElements"
            className="d-flex align-items-end collapse navbar-collapse hamburguer"
            id="mynavbar"
            style={{ width: "10px", color: 'white' }}
          >
              <div className="admin-hamburguer">
            {user && user.rol === "admin" ? (
              <div
                className="d-flex align-items-center"
                style={{ height: "50px", width: "70px", fontSize: "20px" }}
              >
                <Link to="/admin" class="nav-link admin-icono-navbar">
                  Admin
                </Link>
              </div>
            ) : null}
            </div>

            <div className="d-flex">
              <Link to="/user/cart" class="nav-link cart-icono-navbar d-flex">
                <span
                  className="cart-navbar-letters"
                  style={{ color: "white" }}
                >
                  Cart{" "}
                </span>
                <span style={{ fontSize: "35px", color: "white" }}>
                  <IoIosCart />
                </span>
              </Link>
              <div>{isAuthenticated ? null : guest}</div>
              {isAuthenticated && <UserLoged id="UserLoged" user={user} />}
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, null)(Navbar);
