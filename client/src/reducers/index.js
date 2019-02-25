import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import transactionReducer from './transactionReducer';
import userReducer from './userReducer';
import otherReducer from './otherReducer';
import userListReducer from './userListReducer';
// import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    events: eventReducer,
    transactions: transactionReducer,
    user: userReducer,
    others: otherReducer,
    users: userListReducer
    // cart: cartReducer
});

export default rootReducer;
