import styles from "./EditCustomer.module.css";
import { useParams } from "react-router-dom";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormInput from "../../../components/FormInput/FormInput";
import ListInput from "../../../components/ListInput/ListInput";
import FormButton from "../../../components/FormButton/FormButton";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";

function EditCustomer( { customers, setEditedCustomer } ) {
  let { customerId } = useParams();
  customerId = parseInt(customerId);
  const customerSelected = customers.find(customer => customer.id === customerId);

  const editedCustomerLoad = (e) => {
    e.preventDefault();

    let idValue = parseInt(document.getElementById("id").value);
    let customerTypeValue = document.getElementById("customerType").value;
    let emailValue = document.getElementById("email").value;
    let contactNameValue = document.getElementById("contactName").value;
    let buildingsValue = [parseInt(document.getElementById("buildings").value)];
    let fiscalAddressValue = document.getElementById("fiscalAddress").value;
    
    const editedCustomer = {
      "id": idValue,
      "customerType": customerTypeValue,
      "email": emailValue,
      "contact": contactNameValue,
      "buidings": buildingsValue,
      "fiscalAddress": fiscalAddressValue
    }

    setEditedCustomer(editedCustomer);
  };

  return (
    <div className={styles.formBox}>
      <FormHeader type='Edit' />
      <form onSubmit={editedCustomerLoad}>
        <FormInput name='ID' type='text' value={customerSelected.id} />
        <FormInput name='Contact Name' type='text' value={customerSelected.contact} />
        <ListInput name='Customer Type' value={customerSelected.customerType} />    
        <FormInput name='Fiscal Address' type='text' value={customerSelected.fiscalAddress} />
        <FormInput name='Email' type='email' value={customerSelected.email} />
        <FormInput name='Buildings' type='text' value={customerSelected.buildingsId} />
        <FormButton name='Add Building' />
        <FormButton name='Edit Building' />
        <SubmitButton name='Confirm' />
      </form>
    </div>
  )
}

export default EditCustomer;