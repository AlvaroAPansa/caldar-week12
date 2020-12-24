import react from "react";
import styles from "./AddCustomer.module.css";
import Header from "../../../components/Header/Header";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormInput from "../../../components/FormInput/FormInput";
import ListInput from "../../../components/ListInput/ListInput";
import FormButton from "../../../components/FormButton/FormButton";

function AddCustomer( { newCustomer }) {
  
  newCustomer = customer => {

  }

  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div className={styles.formBox}>
        <FormHeader type='Add a new' />
        <form>
          <FormInput name='ID' type='text' />
          <FormInput name='Contact Name' type='text' />
          <ListInput name='Customer Type' />    
          <FormInput name='Fiscal Address' type='text' />
          <FormInput name='Email' type='email' />
          <FormInput name='Buildings' type='text' />
          <FormButton name='Add Building' type='button' />
          <FormButton name='Edit Building' type='button' />
          <FormButton name='Confirm' type='submit' newCustomer={newCustomer} />
      </form>
      </div>
    </div>
  )
}

export default AddCustomer;