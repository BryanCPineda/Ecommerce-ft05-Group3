import Axios from "axios";
import { GET_COMPLETED_ORDERLINES } from "../constants/reviewsConstants";

export function getCompletedOrderlines(id) {
  return (dispatch) => {
    return Axios.get(
      `http://localhost:4000/users/${id}/completedOrderlines`
    ).then((res) => {
      dispatch({ type: GET_COMPLETED_ORDERLINES, payload: res.data });
    });
  };
}
