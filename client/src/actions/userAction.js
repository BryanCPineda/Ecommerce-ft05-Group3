import {
  GET_ALL_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  USER_COMPLETED,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants/userConstants";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getAllUsers = () => (dispatch) => {
  axios.get("http://localhost:4000/users").then((res) => {
    dispatch({ type: GET_ALL_USERS, payload: res.data.rows });
  });
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };

  const token = getState().userReducer.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("http://localhost:4000/auth", config)
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const createUser = (user) => (dispatch) => {
  let userEnv;

  if (user.whitGoogle === true) {
    userEnv = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      image: user.image,
      whitGoogle: user.whitGoogle,
    };
  } else {
    userEnv = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      //EL USERTYPE NO SE AGREGA SOLO UN ADMIN PUEDE HACER A OTRO USER ADMIN, ASI QUE NO SE ENVIA CUANDO SE CREA EL USUARIO POR DEFAULT ES CLIENT
      //EL ADREESS SOLO SE PEDIA CUANDO EL USUARIO HAGA UN CHECKOUT
      //EL USUARIO DECIDIRA SI QUIERE O NO SUBIR UNA IMAGEN
    };
  }

  return axios
    .post("http://localhost:4000/users", userEnv)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

export const loginUser = (user) => (dispatch) => {
  const userEnv = {
    email: user.email,
    password: user.password,
  };

  return axios
    .post("http://localhost:4000/auth", userEnv)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch(
        returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

export function showCompletedOrders(idUser) {
  return (dispatch) => {
    return axios
      .get(`http://localhost:4000/users/1/profile`)
      .then((res) => res.data)
      .then((res) => {
        dispatch({ type: USER_COMPLETED, payload: res });
      });
  };
}

export const logout = () => {
  return { type: LOGOUT_SUCCESS };
};
