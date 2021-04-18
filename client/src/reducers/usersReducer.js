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
  USER_FORGOT_PASSWORD
} from "../constants/userConstants";

const initialState = {

  token: localStorage.getItem('token'),   //busco en el localstorage el token (lo seteo mas abajo)
  isAuthenticated: false,
  user: null,
  allUsers: [],
  imageUser: null,
  promoteUser: '',
  passwordChanged: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_USER:
      return{
        ...state 
      }
    case PROMOTE_USER:
      return{
        ...state,
        promoteUser: action.payload
      }
    case GET_ALL_USERS: // trae todos los usuarios
      return {
        ...state,
        allUsers: action.payload,
      };
    case "DELETE_USER": //
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,    //si se logueo cambio la propiedad isAuthenticated a true
        user: action.payload,     //guardo en user lo que recibo del back
      };

    case LOGIN_SUCCESS:       
    case REGISTER_SUCCESS:    //cualquiera de estos 2 casos hace lo mismo por eso se agrupan
      localStorage.setItem("token", action.payload.token);  //si el login o register salio bien seteo el token en el localstorage
      return {
        ...state,
        token: action.payload.token,  
        user: action.payload.user,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:     
    case LOGIN_FAIL:        //cualquiera de estos 4 casos hace lo mismo por eso se agrupan
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem("token"); //para cualquiera de los 4 casos tengo que remover el token del localStorage
      return {
        ...state,
        token: null,      //tengo que poner en null y falso todas estas propiedades
        isAuthenticated: false,
        user: null,
      };
    case USER_COMPLETED:
      return {
        ...state,
        allUsers: action.payload,
      };
    case 'IMAGE_PROFILE_USER':
      return {
        ...state,
        imageUser: action.payload
      }
    case 'GET_IMAGE_PROFILE_USER':
      return {
        ...state,
        imageUser: action.payload
      }
      case PASSWORD_RESET:
        return {
          ...state,
          passwordChanged: true
        }
     case USER_FORGOT_PASSWORD:
      return {
        ...state,
      }
    default:
      return state;
  }
}
