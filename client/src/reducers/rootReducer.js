import { combineReducers } from 'redux';
import authReducer from './authReducer';
import CatalogoReducer from './catalogoReducer';
import crudCategories from './crudCategoriesReducer';

export default combineReducers({
    auth: authReducer,
    catalogo: CatalogoReducer,
    crudCategories: crudCategories
});