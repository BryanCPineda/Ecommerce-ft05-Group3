import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import './ProductsMati.css';
import { Carousel } from 'react-bootstrap';
import { FiShoppingCart } from "react-icons/fi";

function ProductsMati(props) {
  const mapeo = props.match.params.id;
  const [product, setProduct] = useState({});

  function mostrarProducto() {
    axios
      .get("http://localhost:4000/products/" + mapeo)
      .then((res) => res.data)
      .then((res) => {
        setProduct(res);
      });
  }

  useEffect(() => {
    mostrarProducto();
  });

  return (
    <div>
      {console.log(product)}
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
                product.categories.map((ele) => (
                  <p className="mr-4 h6">{ele.name}</p>
                ))}
            </div>
            <div className="d-flex justify-content-start">
              {product.price && (
                <button className="products-button">
                  Add to Cart <FiShoppingCart />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${product.price}
                </button>
              )}
            </div>
            {product.stock && (
              <p className="products-stock">Stock: {product.stock}</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProductsMati;
