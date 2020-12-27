// import CountR from "./reducers/count";
// import LoggingR from "./reducers/loggin";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
  combineReducers({
    Counter_Selector: CountR,
    Loggin_Selector: LoggingR,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


// const store = createStore(reducer, composeWithDevTools(
//   aapplyMiddleware(thunk),
// ));