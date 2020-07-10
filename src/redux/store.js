import thunk from "redux-thunk";
import { combineReducers, createStore,  applyMiddleware} from "redux";
import Reducers from "./reducers/index";

const reducers = combineReducers({
    user: Reducers.authReducer,
    image: Reducers.imageReducer,
    task: Reducers.taskReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
