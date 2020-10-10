import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import Filter from './Filter';
import SideComponent from './SideComponent';
import data from "../data";
import axios from 'axios';
import './Catalogo.css'


function Catalogo({productSearch}) {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productsByCategories, setProductsByCategories] = useState([])
  const [lower, setLower] = useState([])
  const [highest, setHighest] = useState([])

    useEffect(() => {
      axios
        .get("http://localhost:4000/products")
        .then((res) => res.data)
        .then((res) => setProducts(res.rows));
    }, []);


    useEffect(() => {
      axios
        .get("http://localhost:4000/category")
        .then((res) => res.data)
        .then((res) => setCategories(res));
    }, []);

    useEffect(() => {
      orderByLowerPrice();
    }, [])

    useEffect(() => {
      orderByHighPrice();
    }, [])
  

  const productsArray = data.products.map(ele => ele)

  let sortProductsByPrice = productsArray.map(ele => ele.price)
  //console.log(sortProductsByPrice)

 

  const filterProducts = (e) => {
    if(!e.target.value) {
      setCategories(e.target.value)
      setProducts(productsArray)
    }
    else {
      setCategories(e.target.value)
      setProducts(productsArray)
    }
    //FILTRA POR RUTAS DE BACK
  }

  const orderByLowerPrice = () => {
    console.log('lower')
    let lowPrice = products.sort((a, b) => a.price - b.price);
    setLower(lowPrice);
  };

  const orderByHighPrice = () => {
    console.log('higher')
    let highPrice = products.sort((a, b) => b.price - a.price);
    setHighest(highPrice);
  };


  const productsFromCategories = (categoryName) => {
    axios
      .get(`http://localhost:4000/products/category/${categoryName}`)
      .then((res) => res.data)
      .then((res) =>  setProductsByCategories(res));
  };

  return (
      <Row md={12} className="catalogo">
        <Col xs={0} xl={1} ></Col>
        <Col xs={2} ><SideComponent categories={categories} productsFromCategories={productsFromCategories}
         productsByCategories={productsByCategories} 
          orderByLowerPrice={orderByLowerPrice} orderByHighPrice={orderByHighPrice}/></Col>
        <Col >
      {/* <div > 
        <Filter categories={categories} order={order} filterProducts={filterProducts} orderProducts={orderProducts} />
      </div> */}
        <Row >   
        {productSearch.length > 0 ?
        productSearch.map((ele, index) => (
          <div className="column-productcard">
          <ProductCard 
            key={index}
            id={ele.id}
            name={ele.name}
            description={ele.description.slice(0,50) + "..."}
            price={ele.price}
            stock={ele.stock}
            images={ele.images[0]}
          />
          </div>
        ))
        :
        lower.length > 0 ? 
        lower.map((ele, index) => ( 
          <div className="column-productcard">
          <ProductCard 
            key={index}
            id={ele.id}
            name={ele.name}
            description={ele.description.slice(0,50) + "..."}
            price={ele.price}
            stock={ele.stock}
            images={ele.images[0]}
          />
          </div>
        )) 
        :
        highest.length > 0 ? 
        highest.map((ele, index) => ( 
          <div className="column-productcard">
          <ProductCard 
            key={index}
            id={ele.id}
            name={ele.name}
            description={ele.description.slice(0,50) + "..."}
            price={ele.price}
            stock={ele.stock}
            images={ele.images[0]}
          />
          </div>
        )) 
        : 
        products.map((ele, index) => (
          
            <div className="column-productcard">
          <ProductCard
            key={index}
            id={ele.id}
            name={ele.name}
            description={ele.description.slice(0,50) + "..."}
            price={ele.price}
            stock={ele.stock}
            images={ele.images[0]}
          />
          </div>
        ))
        }
        </Row>
        </Col>
        <Col xs={0} xl={1} ></Col>
        </Row>
  );
}

export default Catalogo;
