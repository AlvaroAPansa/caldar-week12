import React from "react";
import styles from "./Customers.module.css";
import Header from "../../components/Header/Header";
import ListHeader from "./List/ListHeader/ListHeader";
import SearchInput from "./List/SearchInput/SearchInput";
import CustomerItem from "./List/CustomerItem/CustomerItem";

function Customers() {
  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div className={styles.listBox}>
        <SearchInput />
        <ul>
          <lh>
            <ListHeader />
          </lh>
          <li>
            <CustomerItem />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Customers;
