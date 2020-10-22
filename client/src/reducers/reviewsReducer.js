import {
  ONE_STAR_REVIEWS, TWO_STARS_REVIEWS, THREE_STARS_REVIEWS,FOUR_STARS_REVIEWS, FIVE_STARS_REVIEWS, GET_PRODUCT_REVIEWS
} from '../constants/reviewsConstants';

const initialState = {
  reviews: {
    count: 0,
    rows: []
  },
  oneStarReviews: 0,
  twoStarsReviews: 0,
  threeStarsReviews: 0,
  fourStarsReviews: 0,
  fiveStarsReviews: 0,
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
        twoStarsReviews: action.payload
      }
    case THREE_STARS_REVIEWS:
      return {
        ...state,
        threeStarsReviews: action.payload
      }
    case FOUR_STARS_REVIEWS:
      return {
        ...state,
        fourStarsReviews: action.payload
      }
    case FIVE_STARS_REVIEWS:
      return {
        ...state,
        fiveStarsReviews: action.payload
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