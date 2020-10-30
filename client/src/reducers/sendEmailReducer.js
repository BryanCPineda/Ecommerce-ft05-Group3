const initialState = {
  response: "",
  forgotPassword: false,
};

export default function sendEmailReducer(state = initialState, action) {
  switch (action.type) {
    case "WELCOME_EMAIL":
      return {
        ...state,
        response: action.payload,
      };
    case "FORGOT_PASSWORD_EMAIL":
      return {
        ...state,
        forgotPassword: true,
      };
    case "SEND_PURCHASE":
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
}
