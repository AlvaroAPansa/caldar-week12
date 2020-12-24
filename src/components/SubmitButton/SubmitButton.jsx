import styles from "./SubmitButton.module.css";

function SubmitButton( {name, newCustomer} ) {
  return (
    <div className={styles.container}>
      <button type='submit' onClick={newCustomer}>
        {name}
      </button>
    </div>
    );
}

export default SubmitButton;