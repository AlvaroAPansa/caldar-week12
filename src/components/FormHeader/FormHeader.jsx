import styles from "./FormHeader.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function FormHeader( {type} ) {
  return (
    <div className={styles.container}>
      <div className={styles.formTitle}>
        {type} Customer
      </div>
        <Link to="/customers">
            <button type='button' className={styles.closeButton}>
              X
            </button>
        </Link>
    </div>
  )
}

export default FormHeader;