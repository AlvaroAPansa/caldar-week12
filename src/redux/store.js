import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import TableR from "./reducers/tableReducer";
import CustomersR from "./reducers/customersReducer";

export default createStore(
  combineReducers({
    // List of Reducers
    Table_Selector: TableR,
    Customers_Selector: CustomersR,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
