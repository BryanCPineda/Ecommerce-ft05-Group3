import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavbarGeneral.css";
import SearchBar from "./SearchBar/SearchBar";
import SignUp from "./Users/userRegister"; //importamos el componente UserRegister (menu modal)
import SignIn from "./Users/userLogin"; //importamos el componente UserLogin (menu modal)
import Logout from "./Users/Logout"; //importamos el componente Logout (boton)
import { Button, Row, Col, Container, Nav, Navbar } from "react-bootstrap";
import { IoIosCart } from "react-icons/io";
import UserLoged from './Users/UserLoged'
import AddReview from "./Reviews/AddReview";
import { connect } from "react-redux";
import UserProfile from "./Users/Profile";

function NavbarGeneral({ isAuthenticated, user }) {
  // window.addEventListener('scroll', function () {
  // 	let header = document.querySelector('header');
  // 	let windowPosition = window.scrollY > 0;
  // 	header.classList.toggle('scrolling-active', windowPosition);
  // })

const [state, setState] = useState({modal:''})
 function handleOpenLoginCloseReg(){
    setState({modal:true})
 }

  const guest = (
    <div className="d-flex mt-3">
      <span>
        <SignIn state={state} />
      </span>
      <span className="ml-2">
        <SignUp handler={handleOpenLoginCloseReg}/>
      </span>
    </div>
  );



  return (
    <div className="background-al-nav-general navbar">
        <div className="d-flex justify-content-center container" >
        
          <Link to="/user/catalogo">
            <div className="logo">
              <img
                style={{width: '150px', height: '150px'}}
                className="image-brand"
                src={"/images/brand4.png"}
                alt="logo"
              ></img>
            </div>
          </Link>
          {user && user.rol === "admin" ? 
            <div className="d-flex align-items-center" style={{height: "50px", width: '70px', fontSize: '20px'}}>
            <Link to="/admin" class="nav-link admin-icono-navbar">
              Admin
            </Link>
          </div>
          :
          null
          }  
          <div className="searchbar-navbar">
            <SearchBar />
          </div>
          <div className="d-flex">
            <Link to="/user/cart" className="nav-link cart-icono-navbar d-flex">
              <span className="cart-navbar-letters" style={{color: 'white'}}>Cart </span>
              <span style={{ fontSize: "35px", color: 'white' }}>
                <IoIosCart />
              </span>
            </Link>
            <div >
              {isAuthenticated ? null : guest}
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
