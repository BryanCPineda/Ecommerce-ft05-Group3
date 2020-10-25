import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavbarGeneral.css";
import SearchBar from "./SearchBar/SearchBar";
import SignUp from "./Users/userRegister"; //importamos el componente UserRegister (menu modal)
import SignIn from "./Users/userLogin"; //importamos el componente UserLogin (menu modal)
import Logout from "./Users/Logout"; //importamos el componente Logout (boton)
import { Button, Row, Col, Container, Nav, Navbar } from "react-bootstrap";
import { IoIosCart } from "react-icons/io";
import UserLoged from "./Users/UserLoged";
import AddReview from "./Reviews/AddReview";
import { connect } from "react-redux";
import UserProfile from "./Users/Profile";

function NavbarGeneral({ isAuthenticated, user }) {
  // window.addEventListener('scroll', function () {
  // 	let header = document.querySelector('header');
  // 	let windowPosition = window.scrollY > 0;
  // 	header.classList.toggle('scrolling-active', windowPosition);
  // })

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

  const userLoaded = (
    <div className="d-flex mt-3" style={{ height: "50px" }}>
      <div
        className="h6 mr-3 d-flex align-items-center"
        style={{ color: "white" }}
      >
        {user ? `Hi ${user.name} !` : null}
      </div>
      {/* <div ><Logout /></div> */}
    </div>
  );

  return (
    // 		<div style={{backgroundColor: 'blue'}} className="navegacion-general">
    // 			<head>
    //     {/* <meta charset="UTF-8">
    //     <meta name="viewport"
    //           content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //     <title>Document</title>
    //     <link rel="stylesheet" href="styles.css"> */}
    // </head>
    // <body className='fontuse'>
    //     <header>
    //         <div class="container">
    <div className="background-al-nav-general navbar">
      <div className="container">
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
        {user && user.rol === "admin" ? (
          <div
            className="d-flex align-items-center"
            style={{ height: "50px", width: "70px" }}
          >
            <Link to="/admin" class="nav-link admin-icono-navbar">
              Admin
            </Link>
          </div>
        ) : null}
        <div className="searchbar-navbar">
          <SearchBar />
        </div>
        <buttton
          className="navbar-toggler  hidden-sm-up"
          data-toggle="collapse"
          data-target="#collapseElements"
          style={{ fontSize: "40px" }}
        >
          &#9776;
        </buttton>
        <div>
          <div
            id="collapseElements"
            className="d-flex align-items-center ml-5 collapse navbar-collapse"
            id="mynavbar"
            style={{ width: "60px", height: "50px" }}
          >
            <Link to="/user/cart" class="nav-link cart-icono-navbar d-flex">
              <span className="cart-navbar-letters">Cart </span>
              <span style={{ fontSize: "35px" }}>
                <IoIosCart />
              </span>
            </Link>
          </div>
          <div className="sign-logout">
            {isAuthenticated ? userLoaded : guest}
          </div>
          {isAuthenticated && <UserLoged id="UserLoged" user={user} />}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, null)(NavbarGeneral);
// import React from 'react'
// import {Link} from 'react-router-dom'
// import './NavbarGeneral.css'
// import SearchBar from './SearchBar/SearchBar'

// function NavbarGeneral() {
// 	return (

// 		<header class="header">
// 		<nav class="navbar navbar-expand-lg fixed-top py-3">
// 			<Link to="/user/catalogo">
// 			<div className="mt-3 brand">
// 				<img className="image-brand" src={"/images/brand4.png"} alt="logo"></img>
// 			</div>
// 			</Link>
// 			<div class="container" ><a href="#" class="navbar-brand text-uppercase font-weight-bold">Ciber Fitness</a>
// 				<button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler navbar-toggler-right"><i class="fa fa-bars"></i></button>

// 				<div id="navbarSupportedContent" class="collapse navbar-collapse" >
// 					<ul class="navbar-nav ml-auto" className='searchbar'>
// 						<li class="nav-item"><SearchBar /></li>
// 						<li class="nav-item active"><Link to ="/admin"class="nav-link text-uppercase font-weight-bold">Admin </Link></li>
// 						<li class="nav-item"><a href="#" class="nav-link font-weight-bold">Sobre Nosotros</a></li>
// 						<li class="nav-item"><a href="#" class="nav-link font-weight-bold">Contacto</a></li>
// 						<li class="nav-item"></li>
// 						<li class="nav-item"><Link to ="/SignIn"class="nav-link text-uppercase font-weight-bold">Sign In </Link></li>
// 					</ul>
// 				</div>
// 			</div>
// 		</nav>
// 		</header>

// 	)
// }

// export default NavbarGeneral

// try {
//   const { idUser } = req.params;
//   const order = await Order.findAll({ where: { userId: idUser }})
//   let ordersId = []
//   const ordersArray = order.map(ele => ordersId.push(ele.dataValues.id))

//   i = 0;
//   let orderlinesArray = [];
//   while(i <= ordersArray.length -1) {
//     let orderlines = await Orderline.findAll({ where: { orderId: ordersArray[i] } })
//     let orderlinesId = []
//     orderlines.map(ele => orderlinesId.push(ele.dataValues.productId))

//     let arrayProducts = await Promise.all(orderlinesId.map(async (ele) => Product.findAll({ where: { id: ele }})))
//     console.log("gggg", arrayProducts)
//      orderlines.map(async (ele) => {
//       orderlinesArray.push(ele.dataValues)
//       let products = await Product.findAll({ where: { id: ele.dataValues.productId }})
//       products.map(ele => orderlines.push(ele.dataValues.name, ele.dataValues.id))

//     })
//     i++
//     if(i === 5){

//       res.status(200).send(orderlinesArray)
//     }
//   }
// } catch (error) {
//   res.status(400).send(error)
// }
