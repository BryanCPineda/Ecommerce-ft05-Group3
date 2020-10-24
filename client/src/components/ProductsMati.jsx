import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Carousel, Button, Form  } from "react-bootstrap";
import './ProductsMati.css';
import { FiShoppingCart } from "react-icons/fi";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { connect } from 'react-redux';
import {addProductToCart} from '../actions/order';
import {getProductById} from '../actions/product';
import {getProductsFromCart} from '../actions/order';
import Review from './Reviews/Reviews';
import {
  getProductReviews, 
  getOneStarReviews, 
  getTwoStarsReviews, 
  getThreeStarsReviews, 
  getFourStarsReviews, 
  getFiveStarsReviews
} from '../actions/reviewsActions';


function ProductsMati({ 
  user, 
  getProductsFromCart, 
  addProductToCart, 
  product, 
  getProductById, 
  match, 
  cartProducts, 
  cartState, 
  getProductReviews, 
  getOneStarReviews, 
  getTwoStarsReviews, 
  getThreeStarsReviews, 
  getFourStarsReviews, 
  getFiveStarsReviews,
  
}) {

    var body = {
      quantity: '',
      productId:"" 
  }

  const [state, setState] = useState({
    showCard: true,
  })
  useEffect(()=>{
    if(user){
    getProductsFromCart(user.id).then(()=>{
      getProductById(match.params.id).then(()=>{})  
    })}
    else{
      getProductsFromCart().then(()=>{
        getProductById(match.params.id).then(()=>{})  
      })
    }
  }, [cartState]);
  const id = match.params.id;
  useEffect(()=>{
    getProductReviews(id);
    getOneStarReviews(id);
    getTwoStarsReviews(id); 
    getThreeStarsReviews(id); 
    getFourStarsReviews(id);
    getFiveStarsReviews(id);
  },[]);

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

  const handleClick = (id, price) => {
    if(user){
    body.productId = id;
            if(body.quantity === ""){
                  body.quantity=1
                  addProductToCart(user.id, body);
               
                  setState({
                    showCard: false,
                  })
                  /* window.alert("agregue cantidad" )*/
            }   else{
                    addProductToCart(user.id, body);
                 
                    setState({
                      showCard: false,
                    })
                }
    } else {
      alert("no user");
     }

  }

  const onChangeQuantity = (quantity, stock) => {
      body.quantity = quantity;
  }

  return (
    <div>
    <Row style={{marginTop: '700px'}}>
      <Col xs={2}></Col>
      <Col className="products-container" style={{height: '700px'}}>
      <Container>
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
            {product.name && <p className="ml-5 products-title">{product.name}</p>}
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
            <div className="d-flex justify-content-center">
              {    
              !product.stock ? (product.price && (
                  <button disabled={true} className="RO-products-button">
                    Runned Out &nbsp;&nbsp;&nbsp; 
                    <BsFillDashCircleFill />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${product.price}
                  </button>
                )) :
                ( product.price && state.showCard ? 
              <button className="addtocart-productsMati" onClick={()=> handleClick(product.id, product.price)}   >
                Add to Cart&nbsp;<FiShoppingCart /> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${product.price}
              </button> 
              :
              <button disabled={true} className="RO-products-button mb-4">
                Added  &nbsp;&nbsp;
              <BsCheck />
            </button>
            )
            }
            </div>
            <div className="d-flex">
            {
            !product.stock ? (
              <p className="products-stock">Sorry! There is no Stock available</p>
            ) :
              product.stock && (
                <p className="products-stock">Stock: {product.stock}</p>
              )
            }
            <div className="d-flex ">
                <Col className="col-3">
                      {product.stock > 0 &&  (
                          <Form.Control
                              placeholder="1"
                              onChange={(e) =>{ onChangeQuantity(e.target.value) }}
                              min="2"
                              max={product.stock}
                              type="number"
                              style={{width: '8rem', fontSize: '17px', height: '3rem'}}
                              className="form-control-lg"
                          />
                      )}
                  </Col>
            </div>
          </div>
          </div>
        </div>
      </Container>
      </Col>
      <Col xs={2}></Col>
    </Row>
    <Row>
      <Container fluid='sm' className="reviews-container">
        <div>
          <Review />
        </div>
      </Container>
    </Row>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    product: state.productReducer.product,
    cartProducts: state.orderReducer.cartProducts,
    cartState: state.orderReducer.cart,
    user: state.userReducer.user,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: (idUser, body) => dispatch(addProductToCart(idUser, body)),
    getProductById: (id) => dispatch(getProductById(id)),
    getProductsFromCart: (idUser) => dispatch(getProductsFromCart(idUser)),
    getProductReviews: (id)=> dispatch(getProductReviews(id)),
    getOneStarReviews: (id)=> dispatch(getOneStarReviews(id)),
    getTwoStarsReviews: (id)=>dispatch(getTwoStarsReviews(id)),
    getThreeStarsReviews: (id)=>dispatch(getThreeStarsReviews(id)),
    getFourStarsReviews: (id)=>dispatch(getFourStarsReviews(id)),
    getFiveStarsReviews: (id)=>dispatch(getFiveStarsReviews(id)),
   
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsMati);

