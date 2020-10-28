import {
  ONE_STAR_REVIEWS, TWO_STARS_REVIEWS, THREE_STARS_REVIEWS,FOUR_STARS_REVIEWS, FIVE_STARS_REVIEWS, GET_PRODUCT_REVIEWS, ADD_REVIEW, EDIT_REVIEW, DELETE_REVIEW, MATCH_REVIEW
} from '../constants/reviewsConstants';

const initialState = {
  // reviews: {
  //   reviews: {
  //     count: 0,
  //     rows: []
  //   }
  // },
  oneStarReviews: 0,
  twoStarsReviews: 0,
  threeStarsReviews: 0,
  fourStarsReviews: 0,
  fiveStarsReviews: 0,
  review: {},
  myReviews: {
    count: 0,
    rows: []
  }
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
        myReviews: action.payload
      }
    case ADD_REVIEW:
      return {
        ...state,
        review: action.payload
      }
    case EDIT_REVIEW:
      return {
        ...state,
        review: action.payload
      }
    case DELETE_REVIEW:
      return {
        ...state,
      }
    case MATCH_REVIEW:
      console.log('actionPayload', action.payload)
      const {productId, userId, response} = action.payload;
      const key = productId + '_' + userId
      return {
        ...state,
        review: action.payload
      }
      default:
        return state;
      }
    }