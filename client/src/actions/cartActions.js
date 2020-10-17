import axios from "axios";

import {
  ADD_PRODUCT_TO_CART,
  EMPY_SHOPPING_CART,
} from "../constants/cartConstants";

export const addProductToCart = (body) => (dispatch) => {
  axios.post("http://localhost:4000/users/1/cart", body).then((res) => {
    dispatch({ type: ADD_PRODUCT_TO_CART, payload: res.data });
  });
};

export const empyShoppingCart = (idUser) => (dispatch) => {
  axios.delete(`http://localhost:4000/users/${idUser}/cart`).then((res) => {
    dispatch({ type: EMPY_SHOPPING_CART, payload: idUser });
  });
};
