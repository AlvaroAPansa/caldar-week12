import React from "react";
import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={styles.active} to="/customers">
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/technicians">
              Technicians
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/schedule">
              Schedule
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/boilers">
              Boilers
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/settings">
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/reports">
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
