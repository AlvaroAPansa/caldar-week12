import styles from "./FormButton.module.css";

function FormButton( {name, type} ) {
  return (
    <div className={styles.container}>
      <button type={type}>
        {name}
      </button>
    </div>
    );
}

export default FormButton;