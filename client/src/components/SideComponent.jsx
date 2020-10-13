import React, { useEffect, useState } from "react";
import "./SideComponent.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import {FiChevronRight} from 'react-icons/fi'
import { Form , Button} from 'react-bootstrap';
import { connect } from 'react-redux';

/*----------------redux------------------*/
import { getAllCategories } from '../actions/catalogoActions';

function SideComponent({
  orderByHighPrice,
  orderByLowerPrice,
  getAllCategories,
  handleProductsFromCategories,
  categories
}) {

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="sideComponent">
      <h2 className="d-flex justify-content-center mt-5 categories p-4">
        Categories
      </h2>
      <div className="all-content">
        <span>All Products</span>
        <Button
          variant="outline-light"
          style={{ padding: "1px" }}
          className="button-side"
          onClick={() =>
            handleProductsFromCategories("todos los productos")
          }
        >
          <FiChevronRight />{" "}
        </Button>
      </div>
      <div className="side-content">
        {categories &&
          categories.map((element, index) => (
            <Form
              key={index}
              value={categories}
              onChange={handleProductsFromCategories}
            >
              <div
                className="btn-group-vertical"
                className="d-flex justify-content-between mt-4"
              >
                <span>{element.name}</span>
                <Button
                  variant="outline-light"
                  className="button-side"
                  onClick={() =>
                    handleProductsFromCategories(element.name)
                  }
                >
                  <FiChevronRight />{" "}
                </Button>
              </div>
            </Form>
          ))}
      </div>
      <div className="mt-5">
        <h5 className="d-flex justify-content-center title-price">
          Order by Price
        </h5>
        <div>
          <div className="d-flex justify-content-center">
            <label className="mr-3 mb-3">Highest</label>
            <button
              className="ml-3 d-flex align-self-center mb-3 highest"
              type="checkbox"
              onClick={orderByHighPrice}
            >
              <AiOutlineArrowUp />
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <label className="mr-3 p-1">Lowest</label>
            <button
              className="ml-3 d-flex align-self-center mb-1 lowest"
              type="checkbox"
              onClick={orderByLowerPrice}
            >
              <AiOutlineArrowDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.catalogo.allCategories,
    productsFromCategories: state.catalogo.productsFromCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(SideComponent);



