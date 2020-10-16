import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import './ProductsMati.css';
import { Carousel } from 'react-bootstrap';
import { FiShoppingCart } from "react-icons/fi";
import { BsFillDashCircleFill } from "react-icons/bs";
import { connect } from 'react-redux';
import {addProductToCart} from '../actions/cartActions';


function ProductsMati({addProductToCart, product}) {
   
 const body = {
    quantity: 1,
    productId:"" 
}

  const handleClick = (id) => {
    body.productId = id;
    addProductToCart(body);
  }


  useEffect(() => {
  
  },[]);

  return (
    <div>
      <Container className="products-container">
        <div className="d-flex">
          <div className="products-image-div">
            <div className="products-image-div-second">
              <Carousel>
                {product.images &&
                  product.images.map((image, index) => {
                    if (index !== -1) {
                      return (
                        <Carousel.Item key={index}>
                          <div>
                            <img
                              className="products-image"
                              src={image.image}
                              alt={
                                "Imagen " +
                                (index + 1) +
                                " del producto: " +
                                product.name
                              }
                            />
                          </div>
                        </Carousel.Item>
                      );
                    }
                    return null;
                  })}
              </Carousel>
            </div>
          </div>
          <div>
            {product.name && <p className="products-title">{product.name}</p>}
            {product.description && (
              <p className="products-description">{product.description}</p>
            )}
            <p className="products-categories">Categories:</p>
            <div className="d-flex justify-content-center">
              {product.categories &&
                product.categories.map((ele, index) => (
                  <p key={index} className="mr-4 h6">{ele.name}</p>
                ))}
            </div>
            <div className="d-flex justify-content-start">
              {    
              !product.stock ? (product.price && (
                  <button disabled={true} className="RO-products-button">
                    Runned Out &nbsp;&nbsp;&nbsp; 
                    <BsFillDashCircleFill />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${product.price}
                  </button>
                )) :
                product.price && (
                  <button className="products-button" onClick={()=>{handleClick(product.id)}}>
                    Add to Cart <FiShoppingCart />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${product.price}
                  </button>
                )
              }
            </div>
            {
            !product.stock ? (
              <p className="products-stock">Sorry! There is no Stock available</p>
            ) :
              product.stock && (
                <p className="products-stock">Stock: {product.stock}</p>
              )
            }
          </div>
        </div>
      </Container>
    </div>
  );
}
function mapStateToProps(state) {
  return {
        product: state.productReducer.product
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: (body) => dispatch(addProductToCart(body))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsMati);

