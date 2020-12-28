import React from "react";
import styles from "./Customers.module.css";
import Header from "../../shared/Header/Header";
import {useSelector} from "react-redux";

function Customers({history}) {
  const { data, loading, error } = useSelector((s) => s.Table_Selector);
  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div>Customers content</div>
    </div>
  );
}

export default Customers;
