import { combineReducers } from 'redux';
import productReducer from './ProductReducer';
import cartReducer from './CartReducer';

const rootReducer = combineReducers({
    productList: productReducer,
    cartData: cartReducer
});

export default rootReducer;