import {
  PRODUCTS_LOADING,
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  PRODUCTS_FROM_CATEGORIES,
  PRODUCTS_FROM_SEARCH
} from "../constants/catalogoConstants";

const initialState = {
  loading: false,
  allProducts: [],
  allCategories: [],
  productsFromCategories: [],
  productsFromSearch: []
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
        productsFromCategories: action.payload,
      };
    case PRODUCTS_FROM_SEARCH:
      return {
        ...state,
        productsFromSearch: action.payload,
      };
    default:
      return state;
  }
};
