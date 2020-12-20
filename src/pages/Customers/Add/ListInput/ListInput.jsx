import react from "react";
import styles from "./ListInput.module.css";

function ListInput( {name} ) {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>
        <div>
          {name}
        </div>
        <input list='types' id={name} name={name} />
      </label>
      <datalist id='types'>
        <option value='Particular' />
        <option value='Construciton Company' />
      </datalist>
    </div>
  )
}

export default ListInput;