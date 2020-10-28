import {GET_COMPLETED_ORDERLINES} from '../constants/reviewsConstants';

const initialState = {
  orderlines: {
    count: 0,
    rows: []
  }
}

export default function completedOrderlinesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPLETED_ORDERLINES:
      // console.log('GET_COMPLETED_ORDERLINES', action.type)
      return {
        ...state,
        orderlines: action.payload
      }
  
    default:
      return state;
  }
}