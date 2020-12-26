import styles from "./FormButton.module.css";

function FormButton( {name, type, onClick} ) {
  return (
    <div className={styles.container}>
      <button type={type} onClick={onClick}>
        {name}
      </button>
    </div>
    );
}

export default FormButton;