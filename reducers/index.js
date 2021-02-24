import {combineReducers} from 'redux';
import UserReducers from "./userReducers";
import RouterReducers from "./routerReducers";
const rootReducer = combineReducers({
  UserReducers,
  RouterReducers
});

export default rootReducer;
