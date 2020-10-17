import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Carousel, Button, Form  } from "react-bootstrap";
import './ProductsMati.css';
import { FiShoppingCart } from "react-icons/fi";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { connect } from 'react-redux';
import {addProductToCart} from '../actions/cartActions';
import {getProductById} from '../actions/product';
import {getProductsFromCart} from '../actions/cartActions';

function ProductsMati({getProductsFromCart, addProductToCart, product, getProductById, match, cartProducts}) {
   
 var body = {
    quantity: "",
    productId:"" 
}

const [state, setState] = useState({
  showCard: true,
})

useEffect(()=>{
  
  getProductsFromCart().then(()=>{
    getProductById(match.params.id).then(()=>{
                     
    })  
  })
} 
  ,[]);


  useEffect(()=>{
      let variable  
      if (cartProducts.product && product){
        variable = cartProducts.product.find(item => item.id == match.params.id)
      } 
      if(variable) {
         setState({
          showCard: false
        })
    }
   
  },[cartProducts]);

  const handleClick = (id) => {
    body.productId = id;
    addProductToCart(body);
    setState({
      showCard: false,
    })

  }

  const onChangeQuantity = (quantity, stock) => {
      body.quantity = quantity;
  }

  //console.log(cartProducts)
  //console.log (cartProducts.product && cartProducts.product.find(item => item.id == match.params.id))

  //let producto = (cartProducts.product && cartProducts.product.find(item => item.id == match.params.id))

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
                ( product.price && state.showCard ? 
              <button className="border-buttom"  onClick={()=> handleClick(product.id)}   >
                Add to Cart&nbsp;<FiShoppingCart /> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${product.price}
              </button> 
              :
              <button disabled={true} className="RO-border-button">
                 Added  &nbsp;&nbsp;
              <BsCheck />
            </button>
            )
            }
            </div>
            <div>
                <Col className="col-3">
                      {product.stock > 0 &&  (
                          <Form.Control
                              placeholder="Insert Quantity"
                              onChange={(e) =>{ onChangeQuantity(e.target.value) }}
                              min="1"
                              max={product.stock}
                              type="number"
                              className="form-control-lg"
                          />
                      )}
                  </Col>
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
        product: state.productReducer.product,
        cartProducts: state.cartReducer.products
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: (body) => dispatch(addProductToCart(body)),
    getProductById: (id) => dispatch(getProductById(id)),
    getProductsFromCart: () => dispatch(getProductsFromCart()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsMati);

