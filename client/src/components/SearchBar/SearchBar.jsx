import React from "react";
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./SearchBar.css";

export default function SearchBar({ handleChange, handleSubmit }) {
  return (
    <div className="navigation">
      <Link to="/user/catalogo">
      <div className="mt-3 brand">
          <img className="image-brand" src={"/images/brand4.png"} alt="logo"></img>
      </div>
      </Link>
      <div className="mt-4">
        <Form  inline>
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
      <div className="mt-4 sign">
        <button className="button mr-3">Sign in</button>
        <button className="button mr-5 mt-3 sign-up">Sign up</button>
      </div>
    </div>
  );
};

