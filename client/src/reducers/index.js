import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import transactionReducer from './transactionReducer';
// import userReducer from './userReducer';
// import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    events: eventReducer,
    transactions: transactionReducer,
    // user: userReducer,
    // cart: cartReducer
});

export default rootReducer;
