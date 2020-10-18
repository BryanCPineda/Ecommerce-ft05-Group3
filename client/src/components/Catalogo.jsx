import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import Filter from './Filter';
import SideComponent from './SideComponent';
import Pagination from './Pagination';
import axios from 'axios';
import './Catalogo.css';
import { connect } from 'react-redux';

/*----------Redux------------*/
import {
  getAllProducts,
  setProductsLoading,
} from "../actions/catalogoActions";

import {getProductsFromCart} from '../actions/cartActions';

function Catalogo({
  getAllProducts,
  setProductsLoading,
  products,
  loading,
  reload,
  getProductsFromCart,
  cartProducts
}) {

  /*------------------Pagination---------------------*/

  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage] = useState(9);

  const [state, setState] = useState({
        reload: reload,
        cartProducts: []
    })

  useEffect(  () =>{
    
    getProductsFromCart().then(()=>{
             getAllProducts();
   })
  },[])
  
  useEffect(() => {   
    
    setTimeout(() => {
      getAllProducts();
    }, 500);
  
    setState({
      reload: !reload
    })
    
  }, [reload, state.reload, cartProducts ]);

  const indexOfLastProduct = currentPage * elementsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - elementsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber); 
  
    
  
  return (
    <Row md={12} className="catalogo">
      <Col xs={0} xl={1}></Col>
      <Col xs={2}>
        <SideComponent />
      </Col>
      <Col>
        <Row>
          {loading ? (
            <div
              className="spinner-border spinner-catalogo"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) :   currentProducts.length > 0 ? (

            currentProducts.map((ele, index) => (
                       
              <div key={index} className="column-productcard">
                <ProductCard
                  id={ele.id}
                  name={ele.name}
                  description={ele.description.slice(0, 50) + "..."}
                  price={ele.price}
                  stock={ele.stock}
                  images={ele.images[0]}
                /> 
              </div>

            ))
          ) : (
            <div>
              <h1 className="no-products">NO PRODUCTS TO DISPLAY</h1>
            </div>
          )}
        </Row>
        <div className="d-flex justify-content-center mt-5">
          <Pagination elementsPerPage={elementsPerPage} totalElements={products.length} paginate={paginate}/>
        </div>
      </Col>
      <Col xs={0} xl={1}></Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.catalogo.loading,
    products: state.catalogo.allProducts,
    reload: state.productReducer.reload,
    cartProducts: state.cartReducer.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProductsLoading: () => dispatch(setProductsLoading()),
    getAllProducts: () => dispatch(getAllProducts()),
    getProductsFromCart: () => dispatch(getProductsFromCart()),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Catalogo);
