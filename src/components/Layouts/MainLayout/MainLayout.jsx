import React, { useEffect } from "react";
import styles from "./MainLayout.module.css";

import Navbar from "../../shared/Navbar/Navbar";

import Boilers from "../../pages/Boilers/Boilers";
import BoilerDetail from "../../pages/BoilerDetail/BoilerDetail";
import Customers from "../../pages/Customers/Customers";
import CustomerDetail from "../../pages/CustomerDetail/CustomerDetail";
import Reports from "../../pages/Reports/Reports";
import Schedule from "../../pages/Schedule/Schedule";
import ScheduleDetail from "../../pages/ScheduleDetail/ScheduleDetail";
import Settings from "../../pages/Settings/Settings";
import Technicians from "../../pages/Technicians/Technicians";
import Home from "../../pages/Home/Home";
import Modal from "../../shared/Modal/Modal";

import { Switch, Route, Redirect } from "react-router-dom";
import setAuthentication from "../../../redux/actions/authActions";
import { tokenListener } from "../../../firebase";
import Login from "../../pages/Login/Login";
import { bindActionCreators } from "redux";

function MainLayout(authenticated, setAuthentication) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setAuthentication();
    }
  }, [setAuthentication]);

  useEffect(() => {
    tokenListener();
  }, []);

  if (authenticated) {
    return (
      <div className={styles.webContainer}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.content}>
          <Switch>
            <Route path="/boilers/:id" component={BoilerDetail} />
            <Route path="/boilers" exact component={Boilers} />

            <Route path="/customers/:id" component={CustomerDetail} />
            <Route path="/customers" exact component={Customers} />

            <Route path="/reports/:id" component={Reports} />
            <Route path="/reports" exact component={Reports} />

            <Route path="/schedule/:id" component={ScheduleDetail} />
            <Route path="/schedule" exact component={Schedule} />

            <Route path="/settings/:id" component={Settings} />
            <Route path="/settings" exact component={Settings} />

            <Route path="/technicians" exact component={Technicians} />

            <Route path="/" exact component={Home} />
            <Route path="/">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
        <Modal />
      </div>
    );
  }

  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Redirect path='/' to='/login' />
    </Switch>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setAuthentication,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
