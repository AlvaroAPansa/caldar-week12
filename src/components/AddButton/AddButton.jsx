import styles from "./AddButton.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function AddButton() {
  return (
    <Link className={styles.container} to='/customers/add'>
      <button type='button' className={styles.addButton}>
        +
      </button>
    </Link>
  )
}

export default AddButton;