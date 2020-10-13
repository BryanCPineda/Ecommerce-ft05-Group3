import {
  PRODUCTS_LOADING,
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  PRODUCTS_FROM_CATEGORIES,
  PRODUCTS_FROM_SEARCH
} from "../constants/catalogoConstants";
import axios from 'axios';

export const setProductsLoading = () => {
  return { type: PRODUCTS_LOADING };
};

export const getAllProducts = () => (dispatch) => {
  axios.get("http://localhost:4000/products").then((res) => {
    dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.rows });
  });
};

export const getAllCategories = () => (dispatch) => {
  axios.get("http://localhost:4000/category").then((res) => {
    dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
  });
};

export const getProductsFromCategories = (e) => (dispatch) => {
  axios.get(`http://localhost:4000/products/category/${e}`).then((res) => {
    dispatch({ type: PRODUCTS_FROM_CATEGORIES, payload: res.data });
  });
};

export const getProductsFromSearch = (search) => (dispatch) => {
  axios
    .get(`http://localhost:4000/products/search?valor=${search}`)
    .then((res) => {
      dispatch({ type: PRODUCTS_FROM_SEARCH, payload: res.data.rows });
    });
};