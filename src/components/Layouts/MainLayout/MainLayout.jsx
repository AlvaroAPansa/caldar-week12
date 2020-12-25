import React from "react";
import styles from "./MainLayout.module.css";

import Navbar from "../../shared/Navbar/Navbar";

import Boilers from "../../pages/Boilers/Boilers";
import Customers from "../../pages/Customers/Customers";
import Reports from "../../pages/Reports/Reports";
import Schedule from "../../pages/Schedule/Schedule";
import Settings from "../../pages/Settings/Settings";
import Technicians from "../../pages/Technicians/Technicians";
import TechnicianDetail from "../../pages/TechnicianDetail/TechnicianDetail";
import Home from "../../pages/Home/Home";

import { Switch, Route, Redirect } from "react-router-dom";

function MainLayout() {
  return (
    <div className={styles.webContainer}>
      <Navbar />
      <Switch>
        <Route path="/boilers/:id" component={Boilers} />
        <Route path="/boilers" exact component={Boilers} />

        <Route path="/customers/:id" component={Customers} />
        <Route path="/customers" exact component={Customers} />

        <Route path="/reports/:id" component={Reports} />
        <Route path="/reports" exact component={Reports} />

        <Route path="/schedule/:id" component={Schedule} />
        <Route path="/schedule" exact component={Schedule} />

        <Route path="/settings/:id" component={Settings} />
        <Route path="/settings" exact component={Settings} />

        <Route path="/technicians/:id" component={TechnicianDetail} />
        <Route path="/technicians" exact component={Technicians} />

        <Route path="/" exact component={Home} />
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default MainLayout;
