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

function Catalogo({
  getAllProducts,
  setProductsLoading,
  getProductsFromCategories,
  products,
  productsFromCategories,
  productsFromSearch,
}) {

  const [productsByCategories, setProductsByCategories] = useState([]);
  const [priceOrder, serPriceOrder] = useState([]);

  /*------------------Pagination---------------------*/

  // const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage] = useState(9);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => serPriceOrder(""));

  const orderByLowerPrice = () => {
    console.log("lower");
    if (productsFromSearch.length > 0) {
      let orderPrice = productsFromSearch.sort((a, b) => a.price - b.price);
      serPriceOrder(orderPrice);
    } else if (productsByCategories.length > 0) {
      let orderPrice = productsByCategories.sort((a, b) => a.price - b.price);
      serPriceOrder(orderPrice);
    } else {
      let orderPrice = products.sort((a, b) => a.price - b.price);
      serPriceOrder(orderPrice);
    }
  };

  const orderByHighPrice = () => {
    if (productsFromSearch.length > 0) {
      let orderPrice = productsFromSearch.sort((a, b) => b.price - a.price);
      serPriceOrder(orderPrice);
    } else if (productsByCategories.length > 0) {
      let orderPrice = productsByCategories.sort((a, b) => b.price - a.price);
      serPriceOrder(orderPrice);
    } else {
      let orderPrice = products.sort((a, b) => b.price - a.price);
      serPriceOrder(orderPrice);
    }
  };

  const handleProductsFromCategories = (e) => {
    console.log(e);

    if (e === "todos los productos") return setProductsByCategories(products);
    getProductsFromCategories(e);
    if (productsFromCategories.length === 0) {
      setProductsByCategories(-1);
    }
    setProductsByCategories(productsFromCategories);
    console.log(productsFromCategories);
  };

  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Row md={12} className="catalogo">
      <Col xs={0} xl={1}></Col>
      <Col xs={2}>
        <SideComponent
          handleProductsFromCategories={handleProductsFromCategories}
          orderByLowerPrice={orderByLowerPrice}
          orderByHighPrice={orderByHighPrice}
        />
      </Col>
      <Col>
        <Row>
          {productsFromSearch.length > 0 ? (
            productsFromSearch.map((ele, index) => (
              <div key={index} className="column-productcard">
                <ProductCard
                  id={ele.id}
                  name={ele.name}
                  description={ele.description.slice(0, 50) + "..."}
                  price={ele.price}
                  stock={ele.stock}
                  images={ele.images[0]}
                />
              </div>
            ))
          ) : priceOrder.length > 0 ? (
            priceOrder.map((ele, index) => (
              <div key={index} className="column-productcard">
                <ProductCard
                  id={ele.id}
                  name={ele.name}
                  description={ele.description.slice(0, 50) + "..."}
                  price={ele.price}
                  stock={ele.stock}
                  images={ele.images && ele.images[0]}
                />
              </div>
            ))
          ) : productsByCategories && productsByCategories === -1 ? (
            <div>
              <h1 className="no-products">NO PRODUCTS TO DISPLAY</h1>
            </div>
          ) : productsByCategories.length > 0 ? (
            productsByCategories.map((ele, index) => (
              <div key={index} className="column-productcard">
                <ProductCard
                  id={ele.id}
                  name={ele.name}
                  description={ele.description.slice(0, 50) + "..."}
                  price={ele.price}
                  stock={ele.stock}
                  images={ele.images && ele.images}
                  //aca seria images={ele.images[0]}
                />
              </div>
            ))
          ) : (
            products.map((ele, index) => (
              <div key={index} className="column-productcard">
                <ProductCard
                  id={ele.id}
                  name={ele.name}
                  description={ele.description.slice(0, 50) + "..."}
                  price={ele.price}
                  stock={ele.stock}
                  images={ele.images[0]}
                />
              </div>
            ))
          )}
        </Row>
        <div className="d-flex justify-content-center mt-5">
          {/* <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate}/> */}
        </div>
      </Col>
      <Col xs={0} xl={1}></Col>
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
