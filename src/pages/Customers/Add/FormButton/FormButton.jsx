import react from "react";
import styles from "./FormButton.module.css";

function FormButton( {name} ) {
  return (
    <div className={styles.container}>
      <button type='button'>
        {name}
      </button>
    </div>
    );
}

export default FormButton;