import React from "react";
import { Form } from "react-bootstrap";
import { connect } from 'react-redux';
import {
  getAllCategories,
  getAllProducts,
  getProductsFromCategories,
  orderByHigherPrice,
  orderByLowerPrice,
} from "../actions/catalogoActions"; 


function Filter({ getAllCategories,
  getAllProducts,
  getProductsFromCategories,
  categories,
  orderByHigherPrice,
  orderByLowerPrice, }) {

  const handleProductsFromCategories = (e) => {
    if(e.target.value === "All Products") {
      console.log(e.target.value)
      getAllProducts()
    }
    else {
      getProductsFromCategories(e.target.value);
      console.log(e.target.value)
    }
  }

  const arrayCategories = categories.map(ele => ele.name) 
  arrayCategories.unshift("-", "All Products")

  const handleOrderByPrice = (e) => {
    if(e.target.value === "Lowest") orderByLowerPrice();
    else orderByHigherPrice();
  }

  return (
    <div className="d-flex justify-content-center mb-2 mt-4">
      <Form className="ml-5">
        <Form.Group controlId="exampleForm.ControlSelect1" className="d-flex">
          <Form.Label className="mr-2 align-self-center" style={{color: 'white'}}>Filter by categories</Form.Label>
          <Form.Control as="select" value={arrayCategories} onChange={handleProductsFromCategories} >
          {/* <option value="All Products">All Products</option> */}
            {arrayCategories && arrayCategories.map((ele, index) => (
              <option key={index} value={ele}>{ele}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      <Form className="ml-5">
        <Form.Group controlId="exampleForm.ControlSelect1" className="d-flex">
          <Form.Label className="mr-3 align-self-center" style={{color: 'white'}}>Order by price</Form.Label>
          <Form.Control as="select" onChange={handleOrderByPrice}>
            <option value="-">-</option>
            <option value="Lowest">Lowest</option>
            <option value="Highest">Highest</option>
          </Form.Control>
        </Form.Group>
      </Form>
      
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
    getAllProducts: () => dispatch(getAllProducts()),
    getProductsFromCategories: (e) => dispatch(getProductsFromCategories(e)),
    orderByLowerPrice: () => dispatch(orderByLowerPrice()),
    orderByHigherPrice: () => dispatch(orderByHigherPrice()),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Filter)
