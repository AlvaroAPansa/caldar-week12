import react from "react";
import styles from "./AddCustomer.module.css";
import Header from "../../../components/Header/Header";
import FormHeader from "./FormHeader/FormHeader";

function AddCustomer() {
  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div className={styles.formBox}>
        <FormHeader />
      </div>
    </div>
  )
}

export default AddCustomer;