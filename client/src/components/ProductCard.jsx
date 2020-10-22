import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { connect } from 'react-redux';
import {getProductById} from '../actions/product';
import { addProductToCart} from '../actions/cartActions';
import {reloadProductCard} from '../actions/product';
import {getProductsFromCart} from '../actions/cartActions';

function ProductCard({currentProducts, current, name, price, stock, images, id, addProductToCart, cartProducts, user }) {

  const body = {
    quantity: 1,
    productId:"" 
}
 
  const[showCard, setShowCard] = useState("")

  const handleClick = (id) => {
    if(user) {
      body.productId = id;
    setShowCard(false);
    addProductToCart(user.id, body); //idUser
    } else {
      alert("no user")
    }
   }

  useEffect(()=>{
      cartProducts.product && (cartProducts.product.find(product => product.id === id)) ? setShowCard(false) : setShowCard(true)
  } 
    ,[current, currentProducts]);

     
  return (
    <div className="product-card card-container">
      <div className="img d-flex justify-content-center">
        <img variant="top" style={{width: '19rem'}} src={images && images.image} alt="product" className="image"></img>
      </div>
      <Link to={`/user/product/${id}`} className="title-card" > 
        <div className="title-card">
          <p style={{ color: "black" }}>{name}</p>
        </div>
      </Link>
      <div className="d-flex justify-content-around stock-price-cart">
        <div>
          <p
            className="price-card"
            style={{ color: "black", border: "none" }}
          >
            ${price}
          </p>
          <p className="stock-card">Stock: {stock}</p>
        </div>
        <div className="d-flex align-self-center">
          {
            !stock ? (
              <button disabled={true} className="RO-border-button">
              Runned Out  &nbsp;&nbsp;
              <BsFillDashCircleFill />
            </button>
            ) : ( showCard ? 
              <button className="border-buttom"  onClick={()=> handleClick(id)}   >
                Add to Cart&nbsp;
                <FiShoppingCart className="h5 mt-1" />
              </button> 
              :
              <button disabled={true} className="RO-border-button">
                 Added  &nbsp;&nbsp;
              <BsCheck />
            </button>
            )
          }
          
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
        cartState: state.cartReducer.cart,
        user: state.userReducer.user,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: (idUser, body) => dispatch(addProductToCart(idUser, body)),
    getProductById: (id) => dispatch(getProductById(id)),
    reloadProductCard: () => dispatch(reloadProductCard()),
    getProductsFromCart: (idUser) => dispatch(getProductsFromCart(idUser)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);