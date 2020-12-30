import React from "react";
import { useSelector } from "react-redux";
import styles from "./cutomerDetail.module.css";

function CustomerDetail( {match, history} ) {
  const { loading, error, formData} = useSelector(
    (s) => s.Customers_Selector
  );
}