import styles from "./AddButton.module.css";
import { Link } from "react-router-dom";

function AddButton() {
  return (
    <Link className={styles.container} to='/addcustomer'>
      <button type='button' className={styles.addButton}>
        +
      </button>
  </Link>
  )
}

export default AddButton;