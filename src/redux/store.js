import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import TableR from "./reducers/tableReducer";
import TechniciansR from "./reducers/techniciansReducer";
import ModalR from "./reducers/modalReducer";
import CustomersR from "./reducers/customersReducer";

export default createStore(
  combineReducers({
    // List of Reducers
    Table_Selector: TableR,
    Technicians_Selector: TechniciansR,
    Modal_Selector: ModalR,
    Customers_Selector: CustomersR,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
