import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Carousel, Button, Form  } from "react-bootstrap";
import './ProductsMati.css';
import { FiShoppingCart } from "react-icons/fi";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { connect } from 'react-redux';
import {addProductToCart, getProductsFromCart} from '../actions/order';
import {getProductById} from '../actions/product';
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
  isAuthenticated
  
}) {

    var body = {
      quantity: '',
      productId:"" 
  }

// manejo de carrito de guest------------
const [stock, setStock] = useState(0)
const logueado = isAuthenticated

useEffect(()=>{
  if (!logueado){
    let productos = JSON.parse(localStorage.getItem('carrito'))
    let prodLocal = productos && productos.find(product => product.id == match.params.id)
    setStock(prodLocal ? prodLocal.quantity:0)
    console.log(stock)
  }
}, []);



const setItemToCart = (id) => {
  if (!localStorage.getItem('carrito')){
    localStorage.setItem('carrito','[]')}

let getCart = JSON.parse(localStorage.getItem('carrito'))
console.log('quantity------', body.quantity)
let producto = {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock-(body.quantity ? body.quantity : 1),
      images: product.images,
      quantity: body.quantity ? body.quantity : 1
    }
setStock(producto.quantity)
getCart.push(producto)
localStorage.setItem('carrito', JSON.stringify(getCart))
}
// manejo de carrito de guest------------

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
     // mapear el localStorage para setear los botones-----------------------
     if (!logueado){
      let productos = JSON.parse(localStorage.getItem('carrito'))
      productos && productos.find(product => product.id == match.params.id) ? setState({showCard: false}) : setState({showCard: true})
      return
    }
    // mapear el localStorage para setear los botones-----------------------
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
    if (!logueado){
      setItemToCart(id)
      setState({
        showCard: false,
      })
      return
    } else if(user){
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
    } 

  }

  const onChangeQuantity = (quantity, stock) => {
    
      body.quantity = quantity;
  }

  return (
    <div>
      <Container  className="d-flex justify-content-center">
          <div className="d-flex justify-content-around products-container flex-wrap" style={{width: '1500px'}}>
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
            <div style={{width: '600px', height: '600px', marginTop: ' 6rem'}} >
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
                {!product.stock ? (product.price && (
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
                  <p className="products-stock">Stock: {product.stock-stock}</p>
                )
              }
              <div className="d-flex ">
                  <div className="col-3">
                        {product.stock > 0 &&  (
                            <Form.Control
                                placeholder="1"
                                onChange={(e) =>{ onChangeQuantity(e.target.value) }}
                                min="2"
                                max={product.stock-stock}
                                type="number"
                                style={{width: '8rem', fontSize: '17px', height: '3rem'}}
                                className="form-control-lg"
                            />
                        )}
                    </div>
              </div>
            </div>
            </div>
          </div>
      </Container>
      <Container fluid='sm' className="reviews-container" style={{marginTop: '250px'}}>
        <div>
          <Review />
        </div>
      </Container>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    product: state.productReducer.product,
    cartProducts: state.orderReducer.cartProducts,
    cartState: state.orderReducer.cart,
    user: state.userReducer.user,
    isAuthenticated: state.userReducer.isAuthenticated
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

