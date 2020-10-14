import { combineReducers } from 'redux';
import authReducer from './authReducer';
import CatalogoReducer from './catalogoReducer';
import productReducer from './product'
import categoriesReducer from './categories'

export default combineReducers({
    auth: authReducer,
    catalogo: CatalogoReducer,
    productReducer: productReducer,
    categoriesReducer: categoriesReducer
});