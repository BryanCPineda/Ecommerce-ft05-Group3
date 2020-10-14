import { AiFillTaobaoSquare } from "react-icons/ai";
import {
  PRODUCTS_LOADING,
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  PRODUCTS_FROM_CATEGORIES,
  PRODUCTS_FROM_SEARCH,
  ORDER_LOWER_PRICE,
  ORDER_HIGHER_PRICE
} from "../constants/catalogoConstants";

const initialState = {
  loading: AiFillTaobaoSquare,
  allProducts: [],
  allCategories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        loading: false,
        allProducts: action.payload,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case PRODUCTS_FROM_CATEGORIES:
      return {
        ...state,
        allProducts: action.payload,
      };
    case PRODUCTS_FROM_SEARCH:
      return {
        ...state,
        allProducts: action.payload,
      };
    case ORDER_LOWER_PRICE:
      return {
        ...state,
        allProducts: state.allProducts.sort((a, b) => a.price - b.price),
      };
    case ORDER_HIGHER_PRICE:
      return {
        ...state,
        allProducts: state.allProducts.sort((a, b) => b.price - a.price),
      };
    default:
      return state;
  }
};
