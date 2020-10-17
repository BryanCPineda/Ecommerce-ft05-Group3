import { combineReducers } from 'redux';
import authReducer from './authReducer';
import CatalogoReducer from './catalogoReducer';
import crudCategories from './crudCategoriesReducer';
import OrderReducer from './OrderReducer'
import productReducer from './product'
import categoriesReducer from './categories'
import userReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    catalogo: CatalogoReducer,

    crudCategories: crudCategories,
    OrderReducer:OrderReducer,
    productReducer: productReducer,
    categoriesReducer: categoriesReducer,

    userReducer: userReducer

});