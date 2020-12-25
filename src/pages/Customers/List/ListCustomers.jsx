import React from "react";
import styles from "./ListCustomers.module.css";
import SearchInput from "../../../components/SearchInput/SearchInput";
import ListHeader from "../../../components/ListHeader/ListHeader";
import ItemsList from "../../../components/ItemsList/ItemsList";
import AddButton from "../../../components/AddButton/AddButton";

function ListCustomers( { customers } ) {

  return (
    <React.Fragment>
      <div className={styles.listBox}>
        <SearchInput />
        <table>
          <ListHeader />
          <ItemsList customers={customers} />
        </table>
      </div>
      <AddButton />
    </React.Fragment>
  )
}

export default ListCustomers;