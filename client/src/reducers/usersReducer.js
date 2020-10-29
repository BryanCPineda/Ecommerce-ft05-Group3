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
  PASSWORD_RESET
} from "../constants/userConstants";

const initialState = {

  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  allUsers: [],
  imageUser: null,
  promoteUser: '',
  passwordChanged: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
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
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
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
    default:
      return state;
  }
}
