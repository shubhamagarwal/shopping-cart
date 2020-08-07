import { combineReducers } from 'redux';
import productReducer from './ProductReducer';

const rootReducer = combineReducers({
    productList: productReducer
});

export default rootReducer;