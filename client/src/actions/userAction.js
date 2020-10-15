import {
    GET_ALL_USERS,
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER,
  } from "../constants/userConstants";
  import axios from "axios";
  
  export const getAllUsers = () => (dispatch) => {
    axios.get("http://localhost:4000/users").then((res) => {
      dispatch({ type: GET_ALL_USERS, payload: res.data });
    });
  };

  export const createUser = (user) => (dispatch) => {

    const userEnv={
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: user.password, 
            //EL USERTYPE NO SE AGREGA SOLO UN ADMIN PUEDE HACER A OTRO USER ADMIN, ASI QUE NO SE ENVIA CUANDO SE CREA EL USUARIO POR DEFAULT ES CLIENT
            //EL ADREESS SOLO SE PEDIA CUANDO EL USUARIO HAGA UN CHECKOUT
            //EL USUARIO DECIDIRA SI QUIERE O NO SUBIR UNA IMAGEN
    };

    return axios.post("http://localhost:4000/users", userEnv)
    .then((res) => {
      dispatch({ type: CREATE_USER, payload: res.data });
    });
  };