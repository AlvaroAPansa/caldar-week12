import React from "react";
import styles from "./Navbar.module.css";

import { Switch, Route, Link } from "react-router-dom";



function Navbar() {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/technicians">Technicians</Link>
          </li>
          <li>
            <Link to="/schedule">Schedule</Link>
          </li>
          <li>
            <Link to="/boilers">Boilers</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
