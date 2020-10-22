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

import AdminOrders from "./components/Admin/adminOrders";
// import Login from "./components/Login";
import SignUp from "./components/Users/userRegister";

import store from "./store";
import { loadUser } from "./actions/userAction";
import { Provider } from "react-redux";

import NavBarGeneral from "./components/NavbarGeneral";
import NavBarBackground from "./components/NavBarBackground";
import CartUse from "./components/CartUsage/CartUse";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <div>
      <Provider store={store}>
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
          <Route exact path="/admin/orders" component={AdminOrders} />
          <Route exact path="/user/product/:id" component={PrductsMati} />
          <Route path="/user/cart" component={CartUse} />
          <Route path="/user" component={Footer} />
          <Route path="/user/profile" component={UserProfile} />

          {/* <Route path="/SignIn" component={Login} /> */}
          {/* <Route path="/SignUp" component={SignUp} /> */}
        </Router>
      </Provider>
    </div>
  );
}

export default App;
