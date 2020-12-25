import React, { useState, useEffect } from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import styles from "./Customers.module.css";
import Header from "../../components/Header/Header";
import ListCustomers from "./List/ListCustomers";
import AddCustomer from "./Add/AddCustomer";
import EditCustomer from "./Edit/EditCustomer";
import DeleteCustomer from "./Delete/DeleteCustomer";


function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(
      require('../../mocks/customers.json')
    );
  }, []);

  const setNewCustomer = newCustomer => {
    setCustomers(
      [
        ...customers,
        newCustomer
      ]
    );
  };

  let { path, url } = useRouteMatch();

  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <Switch>
        <Route exact path={path}>
          <ListCustomers customers={customers} />
        </Route>
        <Route exact path={`${path}/add`}>
          <AddCustomer setNewCustomer={setNewCustomer} />
        </Route>
        <Route exact path={`${path}/edit/:id`} component={EditCustomer} />
        <Route exact path={`${path}/delete/:id`} component={DeleteCustomer} />
      </Switch>
    </div>
  );
}

export default Customers;
