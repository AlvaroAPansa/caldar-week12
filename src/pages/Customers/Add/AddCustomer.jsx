import React, { useState } from "react";
import styles from "./AddCustomer.module.css";
import Header from "../../../components/Header/Header";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormInput from "../../../components/FormInput/FormInput";
import ListInput from "../../../components/ListInput/ListInput";
import FormButton from "../../../components/FormButton/FormButton";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";

function AddCustomer() {
  const newCustomerInit = {
    id: null,
    customerType: "",
    email: "",
    contactName: "",
    buidings: [],
    fiscalAddress: ""
  };

  const [newCustomer, setNewCustomer] = useState ([newCustomerInit]);

  const newCustomerLoad = (e) => {
    e.preventDefault();

    let idValue = document.getElementById("id").value;
    let customerTypeValue = document.getElementById("customerType").value;
    let emailValue = document.getElementById("email").value;
    let contactNameValue = document.getElementById("contactName").value;
    let buildingsValue = document.getElementById("buildings").value;
    let fiscalAddressValue = document.getElementById("fiscalAddress").value;
    
    const newCustomerData = {
      id: idValue,
      customerType: customerTypeValue,
      email: emailValue,
      contactName: contactNameValue,
      buidings: buildingsValue,
      fiscalAddress: fiscalAddressValue
    }

    setNewCustomer(newCustomerData);

  };
  
  return (
    <div className={styles.container}>
      <Header title="Customers" />
      <div className={styles.formBox}>
        <FormHeader type='Add a new' />
        <form onSubmit={newCustomerLoad}>
          <FormInput name='ID' type='text' />
          <FormInput name='Contact Name' type='text' />
          <ListInput name='Customer Type' />    
          <FormInput name='Fiscal Address' type='text' />
          <FormInput name='Email' type='email' />
          <FormInput name='Buildings' type='text' />
          <FormButton name='Add Building' type='button' />
          <FormButton name='Edit Building' type='button' />
          <SubmitButton name='Confirm' />
      </form>
      </div>
    </div>
  )
}

export default AddCustomer;