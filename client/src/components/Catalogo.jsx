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
  const [order, setOrder] = useState("")

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
  
    //console.log(categories)
    //console.log(products)

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

  const orderProducts = (e) => {
  //  console.log(e.target.value)
    let sort = e.target.value
    setOrder(sort)
    let sortProducts = products.slice()
//    console.log(sortProducts)
    if (sort === "-") {
      sortProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
    } 
    //TERMINAR
    setProducts(sortProducts)
  }

  return (
      <Row md={12} className="catalogo">
        <Col xs={0} xl={1} ></Col>
        <Col xs={2} ><SideComponent categories={categories} /></Col>
        <Col >
      {/* <div > 
        <Filter categories={categories} order={order} filterProducts={filterProducts} orderProducts={orderProducts} />
      </div> */}
        <Row >   
        {console.log("product search ==== ",productSearch)}
        {productSearch.length > 0 ?
        productSearch.map((ele, index) => (
          <Col lg={6} xl={4} className="d-flex flex-nowrap">
          <ProductCard 
            key={index}
            id={ele.id}
            name={ele.name}
            description={ele.description.slice(0,50) + "..."}
            price={ele.price}
            stock={ele.stock}
            images={ele.images[0]}
          />
          </Col>
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
