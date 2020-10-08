import React from "react";
import { Card } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom';
import "./ProductCard.css";

function ProductCard({ name, description, price, stock, image, id }) {
  return (
    <div className="product-card d-flex justify-content-center">
      <Card style={{ width: "18rem" }} className="border-card">
        <div className="img">
          <Card.Img variant="top" src={image} className="image" />
        </div>
        <Card.Body>
          <Link to={`/product/${id}`}>
          <div className="d-flex justify-content-around mt-2 mb-3">
            <Card.Title style={{color: 'black'}}>{name}</Card.Title>
          </div>
          <Card.Text style={{color: 'black'}} className="border-solid">{description}</Card.Text>
          </Link>
          <div className="d-flex justify-content-around">
            <div>
              <Card.Text className="h3 mt-3" style={{color: 'black', border: 'none'}}>${price}</Card.Text>
              <Card.Text>Stock: {stock}</Card.Text>
            </div>
            <div className="d-flex align-self-center">
              <button className="border-buttom">
                Add to Cart&nbsp;
                <FiShoppingCart className="h5 mt-1" />
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;
