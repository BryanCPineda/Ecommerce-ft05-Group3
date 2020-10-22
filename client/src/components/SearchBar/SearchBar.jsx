import React, { useState } from "react";
import "./SearchBar.css";
import { connect } from "react-redux";
import { getProductsFromSearch } from "../../actions/catalogoActions";

function SearchBar(props) {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
    handleOnSubmit(e);
    if (e.target.value.length === 1) {
      setSearch("");
      return props.getProductsFromSearch(e.target.value);
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.getProductsFromSearch(search);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <td>
        <input
          className="search"
          name="search"
          type="text"
          placeholder="Search Product"
          onChange={handleChange}
        />
      </td>
      <td>&nbsp;&nbsp;</td>
      <td>
        <button
          className="button-search-bar mt-3"
          type="submit"
          variant="outline-primary"
        >Search</button>
      </td>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    productsFromSearch: state.catalogo.productsFromSearch,
    user: state.userReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductsFromSearch: (search) => dispatch(getProductsFromSearch(search)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
