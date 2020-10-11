import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import Filter from './Filter';
import SideComponent from './SideComponent';
import Pagination from './Pagination';
import data from "../data";
import axios from 'axios';
import './Catalogo.css';


function Catalogo({productSearch}) {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productsByCategories, setProductsByCategories] = useState([])
  const [lower, setLower] = useState([])
  const [highest, setHighest] = useState([])
  const [selected, setSelected] = useState(false)

  /*------------------Pagination---------------------*/

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);


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

    useEffect(() => setLower(""))

    useEffect(() => setHighest(""))
  

  const productsArray = data.products.map(ele => ele)

  let sortProductsByPrice = productsArray.map(ele => ele.price)
  //console.log(sortProductsByPrice)

  console.log(productsByCategories) 

  const orderByLowerPrice = () => {
    console.log('lower')
    if(productSearch.length > 0) {
      let lowPrice = productSearch.sort((a, b) => a.price - b.price);
      setLower(lowPrice);
    }
    else if(productsByCategories.length > 0) {
      let lowPrice = productsByCategories.sort((a, b) => a.price - b.price);
      setLower(lowPrice);
    }
    else {
      let lowPrice = products.sort((a, b) => a.price - b.price);
    setLower(lowPrice);
    } 
  };

  const orderByHighPrice = () => {
    if(productSearch.length > 0) {
      let lowPrice = productSearch.sort((a, b) => b.price - a.price);
      setLower(lowPrice);
    }
    else if(productsByCategories.length > 0) {
      let lowPrice = productsByCategories.sort((a, b) => b.price - a.price);
      setLower(lowPrice);
    }
    else {
      let lowPrice = products.sort((a, b) => b.price - a.price);
    setLower(lowPrice);
    } 
  };

  const productsFromCategories = (e) => {
    setSelected(true)
    axios
      .get(`http://localhost:4000/products/category/${e.target.value}`)
      .then((res) => res.data)
      .then((res) => {
        if(!res)
        return;
        else setProductsByCategories(productsByCategories.concat(res))
        
      });
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <Row md={12} className="catalogo">
        <Col xs={0} xl={1} ></Col>
        <Col xs={2} ><SideComponent categories={categories} productsFromCategories={productsFromCategories} 
        orderByLowerPrice={orderByLowerPrice} orderByHighPrice={orderByHighPrice}
         selected={selected} productsFromCategories={productsFromCategories} selected={selected}/></Col>
        <Col >
      {/* <div > 
        <Filter categories={categories} productsFromCategories={productsFromCategories} />
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
        productsByCategories &&
        productsByCategories.length > 0 ?
        productsByCategories.map((ele, index) => (
          <div className="column-productcard">
          <ProductCard 
            key={index}
            id={ele.id}
            name={ele.name}
            description={ele.description.slice(0,50) + "..."}
            price={ele.price}
            stock={ele.stock}
            // images={ele.images[0]}
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
        currentProducts.map((ele, index) => (
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
        <div className="d-flex justify-content-center mt-5">
        {/* <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate}/> */}
        </div>
        
        </Col>
        <Col xs={0} xl={1} ></Col>
        </Row>
  );
}

export default Catalogo;
