import axios from "axios";

import {
    ADD_PRODUCT_TO_CART,
    GET_PRODUCTS_FROM_CART
  } from "../constants/cartConstants";

    export const addProductToCart = (idUser, body) => (dispatch) => {

      const config = {
        headers: {
          "Content-type": "Application/json"
        }
      }
    
      const token = getState().userReducer.token
    
      if(token) {
        config.headers["x-auth-token"] = token
      }
        
        axios.post(`http://localhost:4000/users/${idUser}/cart`, body, config)
        .then( res => res.data)
        .then((res) => {
          dispatch({ type: ADD_PRODUCT_TO_CART, payload: res});
        });
    };

    export function getProductsFromCart(idUser){
       return dispatch =>  {

        const config = {
          headers: {
            "Content-type": "Application/json"
          }
        }
      
        const token = getState().userReducer.token
      
        if(token) {
          config.headers["x-auth-token"] = token
        }

         return axios.get(`http://localhost:4000/users/${idUser}/cart`, config)
         .then( res => res.data)
          .then((res) => { 
               dispatch({ type: GET_PRODUCTS_FROM_CART, payload: res });
      })
    }
  };

