import React from "react";
import { useState } from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"


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
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="#home">CyberFitness</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Contacto</Nav.Link>
        <NavDropdown title="Categorías" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/fuerza">Fuerza</NavDropdown.Item>
          <NavDropdown.Item href="#action/musculación">Musculación</NavDropdown.Item>
          <NavDropdown.Item href="#action/cardio">Cardio</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/categoriascompletas">Ver más Categorías</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form onSubmit={handleSubmit} inline >
        
         <input value={search} name="producto" type="text" placeholder="Buscar Producto" onChange={handleChange}></input>
         <Button type="submit" variant="outline-primary" >Buscar</Button>
      </Form>
  
    </Navbar.Collapse>
    </Navbar>
)
};

{/* <Form inline>
    <FormControl type="text" placeholder="Producto" className="mr-sm-2" />
    <Button variant="outline-primary" >Buscar</Button>
  </Form> */}
