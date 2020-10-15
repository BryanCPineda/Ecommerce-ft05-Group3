import { combineReducers } from 'redux';
import authReducer from './authReducer';
import CatalogoReducer from './catalogoReducer';
import crudCategories from './crudCategoriesReducer';

import productReducer from './product'
import categoriesReducer from './categories'

export default combineReducers({
    auth: authReducer,
    catalogo: CatalogoReducer,

    crudCategories: crudCategories,

    productReducer: productReducer,
    categoriesReducer: categoriesReducer

});