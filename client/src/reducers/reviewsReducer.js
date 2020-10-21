import {
  ONE_STAR_REVIEWS, 
  TWO_STARS_REVIEWS,
  THREE_STARS_REVIEWS,
  FOUR_STARS_REVIEWS,
  FIVE_STARS_REVIEWS,
  GET_PRODUCT_REVIEWS
} from '../constants/reviewsConstants';

const initialState = {
  reviews: {
    count: 0,
    rows: []
  },
  oneStarReviews: {
    count: 0,
  },
  twoStarReviews: {
    count: 0,
  },
  threeStarReviews: {
    count: 0,
  },
  fourStarReviews: {
    count: 0,
  },
  fiveStarReviews: {
    count: 0,
  },
}

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case ONE_STAR_REVIEWS:
      return {
        ...state,
        oneStarReviews: action.payload
      }
    case TWO_STARS_REVIEWS:
      return {
        ...state,
        twoStarReviews: action.payload
      }
    case THREE_STARS_REVIEWS:
      return {
        ...state,
        threeStarReviews: action.payload
      }
    case FOUR_STARS_REVIEWS:
      return {
        ...state,
        fourStarReviews: action.payload
      }
    case FIVE_STARS_REVIEWS:
      return {
        ...state,
        fiveStarReviews: action.payload
      }
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      }
      
    default:
      return state;
  }
}