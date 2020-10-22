import {
  GET_ALL_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../constants/crudCategoriesConstants";
import axios from "axios";

export const getAllCategories = () => (dispatch) => {
  axios.get("http://localhost:4000/category").then((res) => {
    dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
  });
};

export const createCategory = (category) => (dispatch) => {

  const config = {
    headers: {
      "Content-type": "Application/json"
    }
  }

  const token = getState().userReducer.token

  if(token) {
    config.headers["x-auth-token"] = token
  }

  axios.post("http://localhost:4000/category", category, config).then((res) => {
    dispatch({ type: CREATE_CATEGORY, payload: res.data });
  });
};

export const deleteCategory = (id) => (dispatch) => {

  const config = {
    headers: {
      "Content-type": "Application/json"
    }
  }

  const token = getState().userReducer.token

  if(token) {
    config.headers["x-auth-token"] = token
  }

  axios.delete(`http://localhost:4000/category/${id}`, config).then((res) => {
    dispatch({ type: DELETE_CATEGORY, payload: id });
  });
};

export const updateCategory = (id, newCategory) => (dispatch) => {

  const config = {
    headers: {
      "Content-type": "Application/json"
    }
  }

  const token = getState().userReducer.token

  if(token) {
    config.headers["x-auth-token"] = token
  }

  axios.put(`http://localhost:4000/category/${id}`, newCategory, config).then((res) => {
    dispatch({ type: UPDATE_CATEGORY, payload: { id, newCategory } });
  });
};