import React from 'react'
import {Link} from 'react-router-dom'
import './NavbarGeneral.css'
import SearchBar from './SearchBar/SearchBar'
import SignUp from './Users/userRegister'
import { Button, Row, Col } from 'react-bootstrap';
import { IoIosCart } from 'react-icons/io';

function NavbarGeneral() {

	window.addEventListener('scroll', function () {
		let header = document.querySelector('header');
		let windowPosition = window.scrollY > 0;
		header.classList.toggle('scrolling-active', windowPosition);
	})

	return (
		<div>
			<head>
    {/* <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css"> */}
</head>
<body className='fontuse'>
    <header>
        <div class="container">
            <nav class="nav d-flex justify-content-around">
				<Link to="/user/catalogo">
				<div class="logo" >
					<img class='image-brand' src={"/images/brand4.png"} alt="logo"></img>
				</div>
				</Link>
                <div class="logo">CIBER Fitness</div>
				<div class='searchbar'><SearchBar /></div>
                <ul class="nav-list">
					<li>
						<Link to ="/user/cart"class="nav-link">Cart <span style={{fontSize: '35px'}}><IoIosCart /></span></Link>
                    </li>
					<li>
						<Link to ="/admin"class="nav-link">Admin</Link>
                    </li>
                </ul>
				<span class="nav-cta"><SignUp /> </span>
                {/* <a href="#" id="nav-cta">Login</a> */}
            </nav>
        </div>
    </header>
</body>
		</div>
	)
}

export default NavbarGeneral



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



