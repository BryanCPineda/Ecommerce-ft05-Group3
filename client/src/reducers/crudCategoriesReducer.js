import {
  GET_ALL_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../constants/crudCategoriesConstants";

const initialState = {
    allCategories: [],
    newCategory: {},
    deletedCategory: {}
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_CATEGORIES:
        return {
          ...state,
          allCategories: action.payload
        };
      case CREATE_CATEGORY:
        return {
          ...state,
          newCategory: action.payload,
        };
      case DELETE_CATEGORY:
        return {
          ...state,
          deletedCategory: action.payload,
        };
      case UPDATE_CATEGORY:
        return {
          ...state,
          newCategory: action.payload,
        };
      default:
        return state;
    }
  };
  