import React from "react";
import styles from "./Customers.module.css";
import Header from "../../components/Header/Header";
import SearchInput from "./SearchInput/SearchInput";

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

          </li>
        </ul>
      </div>
    </div>
  );
}

export default Customers;
