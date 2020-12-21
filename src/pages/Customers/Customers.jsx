import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import styles from "./Customers.module.css";
import Header from "../../components/Header/Header";
import ListHeader from "../../components/ListHeader/ListHeader";
import SearchInput from "../../components/SearchInput/SearchInput";
import ItemsList from "../../components/ItemsList/ItemsList";
import AddButton from "../../components/AddButton/AddButton";
import EditCustomer from "./Edit/EditCustomer";
import DeleteCustomer from "./Delete/DeleteCustomer";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(
      require('../../mocks/customers.json')
    );
  }, []);

  let match = useRouteMatch();
  console.log(`${match.url}/edit`);

  return (
    <Router>
      <Switch>
        <Route path={`${match.url}/edit`} exact>
          <EditCustomer />
        </Route>
        <Route path={`${match.url}/delete`} exact>
          <DeleteCustomer />
        </Route>
        <Route path={`${match.url}`} exact>
          <div className={styles.container}>
            <Header title="Customers" />
            <div className={styles.listBox}>
              <SearchInput />
              <table>
                <ListHeader />
                <ItemsList customers={customers} />
              </table>
            </div>
            <AddButton />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default Customers;
