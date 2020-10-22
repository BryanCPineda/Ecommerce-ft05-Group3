import { combineReducers } from 'redux';
import authReducer from './authReducer';
import CatalogoReducer from './catalogoReducer';
import crudCategories from './crudCategoriesReducer';
import OrderReducer from './OrderReducer'
import productReducer from './product'
import categoriesReducer from './categories'
import ordersReducer from './orders'
import userReducer from './usersReducer';
import orderReducer from './order';
import cartReducer from './cartReducer';
import errorReducer from './errorReducer';
import reviewsReducer from './reviewsReducer';


export default combineReducers({
    auth: authReducer,
    catalogo: CatalogoReducer,
    crudCategories: crudCategories,
    OrderReducer:OrderReducer,
    productReducer: productReducer,
    categoriesReducer: categoriesReducer,
    orderReducer: orderReducer,
    userReducer: userReducer,
    error: errorReducer,
    ordersReducer: ordersReducer,
    cartReducer: cartReducer,
    reviewsReducer: reviewsReducer
});