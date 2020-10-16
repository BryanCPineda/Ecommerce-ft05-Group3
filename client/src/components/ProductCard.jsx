import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { BsFillDashCircleFill } from "react-icons/bs";
import { connect } from 'react-redux';
import {getProductById} from '../actions/product';
import {
  addProductToCart
} from '../actions/cartActions';

function ProductCard({ name, description, price, stock, images, id, addProductToCart, cartState, getProductById}) {

  const body = {
    quantity: 1,
    productId:"" 
}

  const handleClick = (id) => {
    body.productId = id;
    addProductToCart(body);
  }

  const handleClickLinkToProduct = (id) =>{
    getProductById(id)
  }


  return (
    <div className="product-card card-container">
      <div className="img d-flex justify-content-center">
        <img variant="top" style={{width: '19rem'}} src={images && images.image} alt="product" className="image"></img>
      </div>
      <Link to={`/user/product/${id}`} className="title-card" onClick={()=>{handleClickLinkToProduct(id)}}> 
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
            !stock ? (<button disabled={true} className="RO-border-button">
              Runned Out  &nbsp;&nbsp;
              <BsFillDashCircleFill />
            </button>) :
              <button className="border-buttom"  onClick={()=> handleClick(id)}   >
                Add to Cart&nbsp;
                <FiShoppingCart className="h5 mt-1" />
              </button>
          }
          
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
        cartState: state.cartReducer.cart
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: (body) => dispatch(addProductToCart(body)),
    getProductById: (id) => dispatch(getProductById(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);