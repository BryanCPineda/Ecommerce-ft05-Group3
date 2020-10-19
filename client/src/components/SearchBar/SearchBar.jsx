import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./SearchBar.css";
import { connect } from 'react-redux';

/*-------------redux-------------*/
import { getProductsFromSearch } from '../../actions/catalogoActions';

function SearchBar(props) {

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value)
    handleOnSubmit(e)
    if (e.target.value.length === 1) {
      setSearch("")
      return props.getProductsFromSearch(e.target.value)
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault()
    props.getProductsFromSearch(search);
  }

  return (
    // <div className="navigation">
    //   <Link to="/user/catalogo">
    //   <div className="mt-3 brand">
    //       <img className="image-brand" src={"/images/brand4.png"} alt="logo"></img>
    //   </div>
    //   </Link>
      <div>
        <td>
          <tr>
            <td>
          <input
            className="search"
            name="search"
            type="text"
            placeholder="Search Product"
            onChange={handleChange}
          ></input>
          </td>
          {/* <td>
          <button
            className="button"
            type="submit"
            variant="outline-primary"
            onClick={handleOnSubmit}
          >
            Search
          </button>
          </td> */}
          </tr>
        </td>
      </div>
    //   <div className="mt-4 sign">
    //     <Link to ="/admin">
    //     <button className="button mr-3">Admin</button>
    //     </Link>
    //     <Link to="/">
    //     <button className="button mr-5 mt-3 sign-up">Sign out</button>
    //     </Link>      
    //   </div>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productsFromSearch: state.catalogo.productsFromSearch,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsFromSearch: (search) => dispatch(getProductsFromSearch(search)),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(SearchBar)