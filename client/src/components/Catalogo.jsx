import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import Filter from './Filter';
import SideComponent from './SideComponent';
import Pagination from './Pagination';
import axios from 'axios';
import './Catalogo.css';
import { connect } from 'react-redux';

/*----------Redux------------*/
import { getAllProducts, setProductsLoading, getProductsFromCategories } from '../actions/catalogoActions';



function Catalogo(props) {

  const [productsByCategories, setProductsByCategories] = useState([])
  const [priceOrder, serPriceOrder] = useState([])
  const [productSearch, setProductSearch] = useState([])

  /*------------------Pagination---------------------*/

  // const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage] = useState(9);

  // const getProducts = () =>{
  //   axios
  //   .get("http://localhost:4000/products")
  //   .then((res) => res.data)
  //   .then((res) => setProducts(res.rows));
  // }

    useEffect(() => {
      props.getAllProducts();
    }, []);



    useEffect(() => serPriceOrder(""))

    // const orderByLowerPrice = () => {
    //   console.log('lower')
    //   if(productSearch.length > 0) {
    //     let orderPrice = productSearch.sort((a, b) => a.price - b.price);
    //     serPriceOrder(orderPrice);
    //   }
    //   else if(productsByCategories.length > 0) {
    //     let orderPrice = productsByCategories.sort((a, b) => a.price - b.price);
    //     serPriceOrder(orderPrice);
    //   }
    //   else {
    //     let orderPrice = products.sort((a, b) => a.price - b.price);
    //     serPriceOrder(orderPrice);
    //   } 
    // };
  
    // const orderByHighPrice = () => {
    //   if(productSearch.length > 0) {
    //     let orderPrice = productSearch.sort((a, b) => b.price - a.price);
    //     serPriceOrder(orderPrice);
    //   }
    //   else if(productsByCategories.length > 0) {
    //     let orderPrice = productsByCategories.sort((a, b) => b.price - a.price);
    //     serPriceOrder(orderPrice);
    //   }
    //   else {
    //     let orderPrice = products.sort((a, b) => b.price - a.price);
    //     serPriceOrder(orderPrice);
    //   } 
    // };

    const handleProductsFromCategories = (e) => { 
      console.log(e)
      if(e == "todos los productos") return setProductsByCategories(props.products)
      props.getProductsFromCategories(e);
         if(props.productsFromCategories.length == 0)  return setProductsByCategories(-1);
         setProductsByCategories([]);
         setProductsByCategories(props.productsFromCategories);
   }

  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
      <Row md={12} className="catalogo">
        <Col xs={0} xl={1} ></Col>
        <Col xs={2} ><SideComponent handleProductsFromCategories={handleProductsFromCategories}/></Col>
        <Col >
      {/* <div > 
        <Filter categories={categories} productsFromCategories={productsFromCategories} />
      </div> */}
        <Row >
         {props.productsFromSearch.length > 0 ?
          props.productsFromSearch.map((ele, index) => (
          <div key={index} className="column-productcard">
          <ProductCard 
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
        priceOrder.length > 0 ? 
        priceOrder.map((ele, index) => ( 
          <div key={index} className="column-productcard">
          <ProductCard   
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
        (productsByCategories) && (productsByCategories == -1) ?
          <div ><h1 className="no-products" >NO HAY PRODUCTOS PARA ESTA CATEGORIA</h1></div>
        :
        productsByCategories.length > 0 ? 
        productsByCategories.map((ele, index) => (
          <div key={index} className="column-productcard">
          <ProductCard 
            id={ele.id}
            name={ele.name}
            description={ele.description.slice(0,50) + "..."}
            price={ele.price}
            stock={ele.stock}
            images={ele.images && ele.images}
            //aca seria images={ele.images[0]}
          />
          </div>
          ))
        :
        props.products.map((ele, index) => (
            <div key={index} className="column-productcard">
          <ProductCard
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

const mapStateToProps = (state) => {
  return {
    loading: state.catalogo.loading,
    products: state.catalogo.allProducts,
    productsFromCategories: state.catalogo.productsFromCategories,
    productsFromSearch: state.catalogo.productsFromSearch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProductsLoading: () => dispatch(setProductsLoading()),
    getAllProducts: () => dispatch(getAllProducts()),
    getProductsFromCategories: (e) => dispatch(getProductsFromCategories(e))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Catalogo);
