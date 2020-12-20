import react from "react";
import styles from "./FormHeader.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function FormHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.formTitle}>
        Add a new Customer
      </div>
      <Router>
        <Link to='/customers'>
            <button type='button' className={styles.closeButton}>
              X
            </button>
        </Link>
      </Router>
    </div>
  )
}

export default FormHeader;