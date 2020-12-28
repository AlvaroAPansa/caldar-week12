import React from "react";
import styles from "./Customers.module.css";
import Header from "../../shared/Header/Header";
import {useSelector, useDispatch} from "react-redux";
import {fetchResourceList, filterData} from "../../../redux/actions/tableActions"
import {ENDPOINT_CUSTOMERS as BASE_ENDPOINT} from "../../../constants";

function Customers({history}) {
  const { data, loading, error } = useSelector((s) => s.Table_Selector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchResourceList(BASE_ENDPOINT));
  }, []);

  function handleOnSearch(e) {
    const text = e.target.value.toLowerCase();
    dispatch(filterData(text, "business_name", "contact_name", "email"));
  }

  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div>Customers content</div>
    </div>
  );
}

export default Customers;
