import React from "react";
import styles from "./MainLayout.module.css";
import Navbar from "../Navbar/Navbar";
import Boilers from "../../pages/Boilers/Boilers";
import Customers from "../../pages/Customers/Customers";
import Reports from "../../pages/Reports/Reports";
import Schedule from "../../pages/Schedule/Schedule";
import Settings from "../../pages/Settings/Settings";
import Technicians from "../../pages/Technicians/Technicians";
import Home from "../../pages/Home/Home";
import EditCustomer from "../../pages/Customers/Edit/EditCustomer";
import DeleteCustomer from "../../pages/Customers/Delete/DeleteCustomer"
import AddCustomer from "../../pages/Customers/Add/AddCustomer";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function MainLayout() {
  return (
    <div className={styles.webContainer}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/boilers/:id" component={Boilers} />
          <Route path="/boilers" exact component={Boilers} />

          <Route path="/customers" exact component={Customers} />
          <Route path="/customers/add" exact component={AddCustomer} />
          <Route path="/customers/edit/:id" exact component={EditCustomer} />
          <Route path="/customers/delete/:id" exact component={DeleteCustomer} />

          <Route path="/reports/:id" component={Reports} />
          <Route path="/reports" exact component={Reports} />

          <Route path="/schedule/:id" component={Schedule} />
          <Route path="/schedule" exact component={Schedule} />

          <Route path="/settings/:id" component={Settings} />
          <Route path="/settings" exact component={Settings} />

          <Route path="/technicians/:id" component={Technicians} />
          <Route path="/technicians" exact component={Technicians} />

          <Route path="/" exact component={Home} />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default MainLayout;
