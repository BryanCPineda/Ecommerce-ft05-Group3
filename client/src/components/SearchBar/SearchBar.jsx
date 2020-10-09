import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import "./SearchBar.css";

export default function SearchBar({ handleChange, handleSubmit }) {
  return (
    <div className="d-flex justify-content-around navigation">
      <div className="mt-3 brand">
        <Navbar expand="lg" className="ml-5">
          <img className="image-brand" src={"./images/brand4.png"}></img>
        </Navbar>
      </div>
      <div className="mt-4">
        <Form onSubmit={handleSubmit} inline>
          <input
            className="search mr-2 mt-3"
            name="search"
            type="text"
            placeholder="Search Product"
            onChange={handleChange}
          ></input>
          <button
            className="button mt-3"
            type="submit"
            variant="outline-primary"
            onClick={handleSubmit}
          >
            Search
          </button>
        </Form>
      </div>
      <div className="mt-4 mr-4">
        <button className="button mr-3">Sign in</button>
        <button className="button mr-5 mt-3 sign-up">Sign up</button>
      </div>
    </div>
  );
};

{/* <Form inline>
    <FormControl type="text" placeholder="Producto" className="mr-sm-2" />
    <Button variant="outline-primary" >Buscar</Button>
  </Form> */}
