import { combineReducers } from 'redux';
import authReducer from './authReducer';
import CatalogoReducer from './catalogoReducer';

export default combineReducers({
    auth: authReducer,
    catalogo: CatalogoReducer
});