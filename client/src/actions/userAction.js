import {
  GET_ALL_USERS,
  CREATE_USER,
   DELETE_USER,
  UPDATE_USER,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_COMPLETED,
  PROMOTE_USER,
  PASSWORD_RESET,
  USER_FORGOT_PASSWORD,
} from "../constants/userConstants";
import { returnErrors } from "./errorActions";
import axios from "axios";
import swal from "sweetalert";
import {welcomeEmail} from './sendEmail';

export function userForgotPassword(id,newPassword){
       
        return dispatch => {
          return axios.post("http://localhost:4000/users/forgotPassword/"+id, {newPassword:newPassword})
            .then(res => res.data)
            .then(res => {
                  dispatch({ type: USER_FORGOT_PASSWORD, payload: res });
            })
        }
}



export function getAllUsers(){
  return dispatch => { 
    return axios.get("http://localhost:4000/users")
            .then( res => res.data)
            .then( res => {console.log('en actions', res)
                    const users = res.rows.sort(function (a, b) { 
            if (a.id > b.id) {
            return 1;
            }
            if (a.id < b.id) {
            return -1;
            }
            return 0;
                         })
                dispatch({ type: GET_ALL_USERS, payload: users }); 
              });
  }
}

export const loadUser = () => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };

  const token = getState().userReducer.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  /* console.log(config); */

  axios
    .get("http://localhost:4000/auth", config)
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((error) => {
      // if(error.response.status === 401) {
      // if(error) {
      //   dispatch({ type: AUTH_ERROR })
      // }
      //   console.log('unauthorized, logging out ...');
      // return Promise.reject(error.response);
      // }
      /* console.log(error.message); */
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
     
      dispatch({ type: REGISTER_SUCCESS, payload: res.data }) 
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch(
          returnErrors(
            error.response.data,
            error.response.status,
            "REGISTER_FAIL"
          )
        );
        dispatch({ type: REGISTER_FAIL });
      }
    });
};
export const resetPassword = (newPassword) => (dispatch, getState) => {
  
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };

  const token = getState().userReducer.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  console.log('que hay dentro??', newPassword, token, config.headers)
  return axios
  .post("http://localhost:4000/users/passwordReset", { newPassword: newPassword }, config)
  .then((result) => {
    console.log('hay resultados?', result) 
    dispatch({ type: PASSWORD_RESET })
}).catch((error)=>{
  console.log('hay algun error?', error)
})
}

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

export const showCompletedOrders = (idUser) => async (dispatch, getState) => {
  // const config = {
  //   headers: {
  //     "Content-type": "Application/json"
  //   }
  // }

  // const token = getState().userReducer.token

  // if(token) {
  //   config.headers["x-auth-token"] = token
  // }

  const res = await axios.get(`http://localhost:4000/users/${idUser}/profile`);
  dispatch({ type: USER_COMPLETED, payload: res.data });
};
/*-------------------------profile-------------------------*/

export const logout = () => {
  return { type: LOGOUT_SUCCESS };
};

export const promoteUser = (id) => (dispatch, getState,) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };

  const token = getState().userReducer.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  axios.post("http://localhost:4000/auth/promote", {id: id}, config).then(res => {
    dispatch({ type: PROMOTE_USER, payload: res.data })
  })
  .catch(error => { 
    console.log(error.message)
   }
  )
}

export const deleteUser = (id) => (dispatch, getState) => {
  console.log(id)
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };

  const token = getState().userReducer.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  
  axios.delete("http://localhost:4000/users/delete/"+id, config).then(res => {
    dispatch({ type: DELETE_USER, payload: res.data })
  })
  .catch(error => { 
    console.log(error.message)
   }
  )


}  

 


/*--------------------------------------------------*/

export const setImageForUser = (img, idUser) => async (dispatch) => {
 /*  console.log("ima del actions", img); */
  const res = await axios.post(`http://localhost:4000/users/${idUser}/image`, {
    img: img,
  });
  /* console.log(res); */
  dispatch({ type: "IMAGE_PROFILE_USER", payload: res.data });
};

export const getImageOfUser = (idUser) => async (dispatch) => {
  const res = await axios.get(`http://localhost:4000/users/${idUser}/image`);
  dispatch({ type: "GET_IMAGE_PROFILE_USER", payload: res.data });
};
