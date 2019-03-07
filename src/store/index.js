import { createStore } from "redux";
import rootReducer from "../reducers/index";

// reducers produce the state of the application
const store = createStore(rootReducer);

export default store;