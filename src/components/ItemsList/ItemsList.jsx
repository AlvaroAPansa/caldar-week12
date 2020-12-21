import React from "react";
import styles from "./ItemsList.module.css";
import CustomerItem from "../CustomerItem/CustomerItem";

function ItemsList( {customers} ) {

  return customers.map((customer) => {
    return(
        <CustomerItem key={customer.id} customer={customer} />
    )
  })
}

export default ItemsList;