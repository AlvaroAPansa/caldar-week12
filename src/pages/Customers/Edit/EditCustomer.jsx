import react from "react";
import styles from "./EditCustomer.module.css";
import Header from "../../../components/Header/Header";
import FormHeader from "../Add/FormHeader/FormHeader";
import FormInput from "../Add/FormInput/FormInput";
import ListInput from "../Add/ListInput/ListInput";
import FormButton from "../Add/FormButton/FormButton";

function EditCustomer() {
  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div className={styles.formBox}>
        <FormHeader />
        <form>
          <FormInput name='ID' type='text' />
          <FormInput name='Contact Name' type='text' />
          <ListInput name='Customer Type' />    
          <FormInput name='Fiscal Address' type='text' />
          <FormInput name='Email' type='email' />
          <FormInput name='Buildings' type='text' />
          <FormButton name='Add Building' />
          <FormButton name='Edit Building' />
          <FormButton name='Confirm' />
      </form>
      </div>
    </div>
  )
}

export default EditCustomer;