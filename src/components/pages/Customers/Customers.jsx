import React from "react";
import styles from "./Customers.module.css";
import Header from "../../shared/Header/Header";

function Customers() {
  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div>Customers content</div>
    </div>
  );
}

export default Customers;
