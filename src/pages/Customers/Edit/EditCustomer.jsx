import styles from "./EditCustomer.module.css";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormInput from "../../../components/FormInput/FormInput";
import ListInput from "../../../components/ListInput/ListInput";
import FormButton from "../../../components/FormButton/FormButton";

function EditCustomer() {
  return (
    <div className={styles.formBox}>
      <FormHeader type='Edit' />
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
  )
}

export default EditCustomer;