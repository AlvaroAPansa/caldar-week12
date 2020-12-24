import React, { useState, useEffect } from "react";
import styles from "./Customers.module.css";
import Header from "../../components/Header/Header";
import ListHeader from "../../components/ListHeader/ListHeader";
import SearchInput from "../../components/SearchInput/SearchInput";
import ItemsList from "../../components/ItemsList/ItemsList";
import AddButton from "../../components/AddButton/AddButton";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(
      require('../../mocks/customers.json')
    );
  }, []);

  /*newCustomer ((customer) => {
    setCustomers(
      {
        ...customers,
        newCustomer
      }
    );
  });*/

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
