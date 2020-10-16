import React from 'react'
import {Link} from 'react-router-dom'
import './NavbarGeneral.css'
import SearchBar from './SearchBar/SearchBar'

function NavbarGeneral() {
	return (
		
		<header class="header">
		<nav class="navbar navbar-expand-lg fixed-top py-3">
			<Link to="/user/catalogo">
			<div className="mt-3 brand">
				<img className="image-brand" src={"/images/brand4.png"} alt="logo"></img>
			</div>
			</Link>
			<div class="container" ><a href="#" class="navbar-brand text-uppercase font-weight-bold">Ciber Fitness</a>
				<button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler navbar-toggler-right"><i class="fa fa-bars"></i></button>
	
				<div id="navbarSupportedContent" class="collapse navbar-collapse" >
					<ul class="navbar-nav ml-auto" className='searchbar'>
						<li class="nav-item"><SearchBar /></li>
						<li class="nav-item active"><Link to ="/admin"class="nav-link text-uppercase font-weight-bold">Admin </Link></li>
						<li class="nav-item"><a href="#" class="nav-link font-weight-bold">Sobre Nosotros</a></li>
						<li class="nav-item"><a href="#" class="nav-link font-weight-bold">Contacto</a></li>
						<li class="nav-item"></li>
						<li class="nav-item"><Link to ="/SignIn"class="nav-link text-uppercase font-weight-bold">Sign In </Link></li>
					</ul>
				</div>
			</div>
		</nav>
		</header>
	
		
	)
}

export default NavbarGeneral



