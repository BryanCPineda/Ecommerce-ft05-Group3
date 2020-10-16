

const initialState = {
  allUsers: [],
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_USERS": // trae todos los usuarios
      return {
        ...state,
        allUsers: action.payload
      };
    case "CREATE_USER":
      return {
        ...state,
        user: action.payload
      };
    case "DELETE_USER": //
      return {
        ...state,
        users: action.payload,
      };

    case "UPDATE_USER":
      return {
        ...state,
      };
    default:
      return state;
  }
}
