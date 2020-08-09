import { combineReducers } from 'redux';
import productReducer from './ProductReducer';
import cartReducer from './CartReducer';
import loginReducer from './LoginReducer';

const rootReducer = combineReducers({
    productList: productReducer,
    cartData: cartReducer,
    user: loginReducer
});

export default rootReducer;