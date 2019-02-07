import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
// import userReducer from './userReducer';
// import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    events: eventReducer,
    // user: userReducer,
    // cart: cartReducer
});

export default rootReducer;
