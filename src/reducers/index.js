import { combineReducers } from "redux";
import user from "./user";
import prediction from "./prediction";

export default combineReducers({
  user,
  prediction,
});