import axios from "axios";

import {
    ADD_PRODUCT_TO_CART,
    GET_PRODUCTS_FROM_CART
  } from "../constants/cartConstants";

    export const addProductToCart = (body) => (dispatch) => {
        
        return axios.post("http://localhost:4000/users/1/cart", body)
        .then( res => res.data)
        .then((res) => {
          dispatch({ type: ADD_PRODUCT_TO_CART, payload: res});
        });
    };

    export function getProductsFromCart(){
       return dispatch =>  {
         return axios.get("http://localhost:4000/users/1/cart")
         .then( res => res.data)
          .then((res) => { 
               dispatch({ type: GET_PRODUCTS_FROM_CART, payload: res });
      })
    }
  };

