import styles from "./DeleteCustomer.module.css";
import Header from "../../../components/Header/Header";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormButton from "../../../components/FormButton/FormButton";

function DeleteCustomer() {
  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div className={styles.formBox}>
        <FormHeader type='Delete' />
        <p>Are you sure you sure you want to delete this customer?</p>
        <FormButton name='Cancel' />
        <FormButton name='Confirm' />
      </div>
    </div>
  )
}

export default DeleteCustomer;