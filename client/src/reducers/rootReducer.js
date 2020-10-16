import { combineReducers } from 'redux';
import authReducer from './authReducer';
import CatalogoReducer from './catalogoReducer';
import crudCategories from './crudCategoriesReducer';

import productReducer from './product'
import categoriesReducer from './categories'
import userReducer from './usersReducer';
import orderReducer from './order';

export default combineReducers({
    auth: authReducer,
    catalogo: CatalogoReducer,

    crudCategories: crudCategories,

    productReducer: productReducer,
    categoriesReducer: categoriesReducer,
    orderReducer: orderReducer,
    userReducer: userReducer

});