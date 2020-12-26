import styles from "./DeleteCustomer.module.css";
import { useParams } from "react-router-dom";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormButton from "../../../components/FormButton/FormButton";

function DeleteCustomer( {setDeletedCustomer} ) {
  let { customerId } = useParams();
  customerId = parseInt(customerId);

  const confirmDeletion = () => {
    setDeletedCustomer(customerId);
  };

  return (
    <div className={styles.formBox}>
      <FormHeader type='Delete' />
      <p>Are you sure you sure you want to delete this customer?</p>
      <FormButton name='Cancel' />
      <FormButton name='Confirm' onClick={confirmDeletion} />
    </div>
  )
}

export default DeleteCustomer;