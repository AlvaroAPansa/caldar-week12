import react from "react";
import styles from "./FormInput.module.css";

function FormInput( {name, type} ) {
  return (
    <div className={styles.container}>
    <label htmlFor={name}>
      <div className={styles.title}>
        {name}
      </div>
      <input type={type} id={name} name={name} className={styles.inputField} />
    </label>
  </div>
  )
}

export default FormInput;