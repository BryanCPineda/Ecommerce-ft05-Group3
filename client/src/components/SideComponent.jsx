import React, { useEffect, useState } from "react";
import "./SideComponent.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

/*----------------redux------------------*/
import { getAllCategories, getProductsFromCategories, getAllProducts } from '../actions/catalogoActions';

function SideComponent(props) {

  useEffect(() => {
    props.getAllCategories();
  }, []);

  console.log(props)

  return (
    <div className="sideComponent">
      <h2 className="d-flex justify-content-center mt-5 categories p-4">
        Categories
      </h2>
      <button type="button" style={{backgroundColor: '#4A00E0', color: 'white'}}  
      className="btn ml-3" onClick={()=> props.handleProductsFromCategories("todos los productos")}>ALL PRODUCTS </button>
      {props.categories && props.categories.map((element, index) => (
            <Form key={index} value={props.categories} onChange={props.handleProductsFromCategories}>
              <div  class="btn-group-vertical" className="d-flex justify-content-between mt-4">
                {/*<Form.Label className="label-side-bar ml-3">{element.name}</Form.Label>*/}
                <button type="button" 
                className="ml-5 button-side" onClick={() => props.handleProductsFromCategories(element.name)}>{element.name}</button>
                {/*<input className="input-sidebar mr-2" value={element.name} type="checkbox"></input>*/}
              </div>
            </Form>
          ))}
      {/* <div className="mt-5">
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
      </div> */}
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
    getProductsFromCategories: (e) => dispatch(getProductsFromCategories(e)),
    getAllProducts: () => dispatch(getAllProducts()),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(SideComponent);



