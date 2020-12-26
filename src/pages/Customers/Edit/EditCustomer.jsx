import styles from "./EditCustomer.module.css";
import { useParams } from "react-router-dom";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormInput from "../../../components/FormInput/FormInput";
import ListInput from "../../../components/ListInput/ListInput";
import FormButton from "../../../components/FormButton/FormButton";

function EditCustomer( { customers } ) {
  let { customerId } = useParams();
  customerId = parseInt(customerId);
  const customerSelected = customers.find(customer => customer.id === customerId);

  return (
    <div className={styles.formBox}>
      <FormHeader type='Edit' />
      <form>
        <FormInput name='ID' type='text' value={customerSelected.id} />
        <FormInput name='Contact Name' type='text' value={customerSelected.contact} />
        <ListInput name='Customer Type' value={customerSelected.customerType} />    
        <FormInput name='Fiscal Address' type='text' value={customerSelected.fiscalAddress} />
        <FormInput name='Email' type='email' value={customerSelected.email} />
        <FormInput name='Buildings' type='text' value={customerSelected.buildingsId} />
        <FormButton name='Add Building' />
        <FormButton name='Edit Building' />
        <FormButton name='Confirm' />
      </form>
    </div>
  )
}

export default EditCustomer;