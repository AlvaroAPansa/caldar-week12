import React, { useState, useEffect } from "react";
import styles from "./Customers.module.css";
import Header from "../../components/Header/Header";
import ListHeader from "./List/ListHeader/ListHeader";
import SearchInput from "./List/SearchInput/SearchInput";
import ItemsList from "./List/ItemsList/ItemsList";
import AddButton from "./List/AddButton/AddButton";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(
      require('../../mocks/customers.json')
    );
  }, []);

  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div className={styles.listBox}>
        <SearchInput />
        <table>
          <ListHeader />
          <ItemsList customers={customers} />
        </table>
      </div>
      <AddButton />
    </div>
  );
}

export default Customers;
