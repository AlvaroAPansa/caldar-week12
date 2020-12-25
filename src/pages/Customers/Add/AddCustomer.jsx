import React from "react";
import styles from "./AddCustomer.module.css";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormInput from "../../../components/FormInput/FormInput";
import ListInput from "../../../components/ListInput/ListInput";
import FormButton from "../../../components/FormButton/FormButton";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";

function AddCustomer( { setNewCustomer } ) {

  const newCustomerLoad = (e) => {
    e.preventDefault();

    let idValue = parseInt(document.getElementById("id").value);
    let customerTypeValue = document.getElementById("customerType").value;
    let emailValue = document.getElementById("email").value;
    let contactNameValue = document.getElementById("contactName").value;
    let buildingsValue = [parseInt(document.getElementById("buildings").value)];
    let fiscalAddressValue = document.getElementById("fiscalAddress").value;
    
    const newCustomer = {
      "id": idValue,
      "customerType": customerTypeValue,
      "email": emailValue,
      "contactName": contactNameValue,
      "buidings": buildingsValue,
      "fiscalAddress": fiscalAddressValue
    }

    setNewCustomer(newCustomer);

  };
  
  return (
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
  )
}

export default AddCustomer;