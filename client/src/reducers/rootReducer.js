import { combineReducers } from 'redux';
import authReducer from './authReducer';
import CatalogoReducer from './catalogoReducer';
import crudCategories from './crudCategoriesReducer';
 
import productReducer from './product'
import categoriesReducer from './categories'
import ordersReducer from './orders'
import userReducer from './usersReducer';
import orderReducer from './order';
 
import errorReducer from './errorReducer';
import reviewsReducer from './reviewsReducer';
import completedOrderlinesReducer from './CompletedOrderlinesReducer';
import sendEmailReducer from './sendEmailReducer';

export default combineReducers({
    auth: authReducer,
    catalogo: CatalogoReducer,
    crudCategories: crudCategories,
    productReducer: productReducer,
    categoriesReducer: categoriesReducer,
    orderReducer: orderReducer,
    userReducer: userReducer,
    error: errorReducer,
    ordersReducer: ordersReducer,
    reviewsReducer: reviewsReducer,
    sendEmailReducer: sendEmailReducer,
    completedOrderlinesReducer: completedOrderlinesReducer
});