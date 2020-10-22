import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Carousel, Button, Form  } from "react-bootstrap";
import './ProductsMati.css';
import { FiShoppingCart } from "react-icons/fi";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { connect } from 'react-redux';
import {addProductToCart} from '../actions/cartActions';
import {getProductById} from '../actions/product';
import {getProductsFromCart} from '../actions/cartActions';
import Review from './Reviews.jsx'
function ProductsMati({getProductsFromCart, addProductToCart, product, getProductById, match, cartProducts, cartState}) {

  var body = {
      quantity: "",
      productId:"" 
  }

// manejo de carrito de guest------------
const [stock, setStock] = useState(0)
const logueado = false

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
  getProductsFromCart().then(()=>{
    getProductById(match.params.id).then(()=>{
    })  
  })
}, [cartState]);


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
    }
    body.productId = id;
    if(body.quantity === ""){
          body.quantity=1
          addProductToCart(body);
    setState({
      showCard: false,
    })
          /* window.alert("agregue cantidad" )*/
    }else{
    addProductToCart(body);
    setState({
      showCard: false,
    })
}
  }

  const onChangeQuantity = (quantity, stock) => {
      body.quantity = quantity;
  }

  return (
    <div>
    <Row>
      <Col xs={2}></Col>
      <Col className="products-container">
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
              {!product.stock ? (product.price && (
                  <button disabled={true} className="RO-products-button">
                    Runned Out &nbsp;&nbsp;&nbsp; 
                    <BsFillDashCircleFill />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${product.price}
                  </button>
                )) :
                ( product.price && state.showCard ? 
              <button className="addtocart-productsMati" onClick={()=> handleClick(product.id)}   >
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
                <Col className="col-3">
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
      <Col xs={3}></Col>
        <div>
          <Review/>
        </div>
      <Col xs={3}></Col>
    </Row>
    </div>
  );
}
function mapStateToProps(state) {
  return {
        product: state.productReducer.product,
        cartProducts: state.cartReducer.products,
        cartState: state.cartReducer.cart,
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

