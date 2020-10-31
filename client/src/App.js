import React, { useState, useEffect } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import FormCategories from "./components/FormCategories/FormCategories";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import Catalogo from "./components/Catalogo";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import LandingPage from "./components/LandingPage";
import PrductsMati from "./components/ProductsMati";
import Footer from "./components/Footer";
import NavbarAdmin from "./components/NavbarAdmin";
import UserProfile from "./components/Users/Profile";
import UserForgotPassword from "./components/Users/UserForgotPassword";
import passwordResetLink from "./components/Users/passwordResetLink";

import AdminOrders from "./components/Admin/adminOrders";
import AdminUsers from "./components/Admin/adminUsers";
// import Login from "./components/Login";
import SignUp from "./components/Users/userRegister";

import store from "./store";
import { Provider } from "react-redux";

import NavBarGeneral from "./components/NavbarGeneral";
import NavBarBackground from "./components/NavBarBackground";
import CartUse from "./components/CartUsage/CartUse";
import isAdmin from "./components/roles/IsAdmin";
import isUser from "./components/roles/IsAdmin";
import Error404 from "./components/Error404";
import Navbar from "./components/Navbar";
import AddAdress from "./components/checkout/AddAdress";
import About from "./components/Footer/About";
import Terms from "./components/Footer/Terms";
import Privacy from "./components/Footer/Privacy";

import { connect } from "react-redux";
import { loadUser } from "./actions/userAction";
import Reviews from "./components/Reviews/Reviews";
import Checkout from "./components/checkout/Checkout";

function App({ loadUser }) {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <Router>
        {/* <Route path="/user" render={() => <SearchBar />} /> */}
        <Route path="/user" component={NavBarGeneral} />
        <Route path="/user" component={NavBarBackground} />
        <Route path="/admin" component={NavbarAdmin} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/user/catalogo" render={() => <Catalogo />} />
        <Route exact path="/admin/categories" component={FormCategories} />
        <Route exact path={"/user/carrito"} component={CartUse} />
        <Route exact path="/admin/product" component={AdminProducts} />
        <Route exact path="/admin/users" component={AdminUsers} />
        <Route exact path="/admin/orders" component={AdminOrders} />
        <Route exact path="/user/product/:id" component={PrductsMati} />
        <Route path="/user/checkout" component={Checkout} />
        <Route path="/user/cart" component={CartUse} />
        <Route path="/error404" component={Error404} />
        <Route path="/user/password/reset" component={UserForgotPassword} />
        <Route path="/user/forgotPassword" component={passwordResetLink} />
        <Route path="/user/profile" component={UserProfile} />
        <Route path="/user/about" component={About} />
        <Route path="/user/terms" component={Terms} />
        <Route path="/user/privacy" component={Privacy} />

        <Route exact path="/navbar" component={Navbar} />
        <Route path="/user" component={Footer} />

        {/* <Route path="/SignIn" component={Login} /> */}
        {/* <Route path="/SignUp" component={SignUp} /> */}
      </Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(loadUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
