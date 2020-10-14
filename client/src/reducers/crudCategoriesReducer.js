import {
  GET_ALL_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../constants/crudCategoriesConstants";

const initialState = {
    allCategories: [],
    newCategory: {},
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
          allCategories: [...state.allCategories, action.payload]
        };
      case DELETE_CATEGORY:
        return {
          ...state,
          allCategories: state.allCategories.filter(category => category.id !== action.payload)
        };
      case UPDATE_CATEGORY:
        return {
          ...state,
          allCategories: state.allCategories.map((content, id) =>
            content.id === action.payload.id ? 
            {...content, name: action.payload.newCategory.name, description: action.payload.newCategory.description } : content)
        };
      default:
        return state;
    }
  };
  