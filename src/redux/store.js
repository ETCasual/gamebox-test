import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "redux/rootReducer";

// THUNK MIDDLEWARE
const middleware = [thunk];

// REDUX STORE INSTANCE WITH DEV TOOLS & MIDDLEWARE
const composeEnhancers =
    process.env.REACT_APP_NODE_ENV === "development" ? composeWithDevTools : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, enhancer);

export default store;
