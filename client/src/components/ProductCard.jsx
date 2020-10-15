import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { BsFillDashCircleFill } from "react-icons/bs";


function ProductCard({ name, description, price, stock, images, id }) {
  return (
    <div className="product-card card-container">
      <div className="img d-flex justify-content-center">
        <img variant="top" style={{width: '19rem'}} src={images && images.image} alt="product" className="image"></img>
      </div>
      <Link to={`/user/product/${id}`} className="title-card"> 
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
              <button className="border-buttom">
                Add to Cart&nbsp;
                <FiShoppingCart className="h5 mt-1" />
              </button>
          }
          
        </div>
      </div>
    </div>
  );
}

export default ProductCard;