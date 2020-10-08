import React from "react";
import { useState } from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"
import './SearchBar.css'


export default function SearchBar (){

  const [search, setSearch]=useState("")

  

  const handleChange=(e)=>{
    setSearch(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    setSearch(alert("Stock de "+search+" agotado"))
  }

  return (
    <div className="d-flex justify-content-around navigation">
      <div className="mt-3 brand">
    <Navbar expand="lg">
    <img className="image-brand" src={'./images/brand4.png'}></img>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link style={{color: 'white'}} href="#home">Home</Nav.Link>
        <Nav.Link style={{color: 'white'}} href="#link">Contacto</Nav.Link>
        <NavDropdown style={{color: 'white'}} title="Categorías" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/fuerza">Fuerza</NavDropdown.Item>
          <NavDropdown.Item href="#action/musculación">Musculación</NavDropdown.Item>
          <NavDropdown.Item href="#action/cardio">Cardio</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/categoriascompletas">Ver más Categorías</NavDropdown.Item>
        </NavDropdown>
      </Nav>
  
    </Navbar.Collapse>
    </Navbar>
    </div>
    <div className="mt-4">
    <Form onSubmit={handleSubmit} inline >
        <input className="search mr-2 mt-3" value={search} name="producto" type="text" placeholder="Search Product" onChange={handleChange}></input>
        <button className="button mt-3" type="submit" variant="outline-primary" >Search</button>
     </Form>
    </div>
    <div className="mt-4 mr-4">
      <button className="button mr-3">Sign in</button>
      <button className="button mr-5 mt-3">Sign up</button>
    </div>

    </div>
)
};

{/* <Form inline>
    <FormControl type="text" placeholder="Producto" className="mr-sm-2" />
    <Button variant="outline-primary" >Buscar</Button>
  </Form> */}
