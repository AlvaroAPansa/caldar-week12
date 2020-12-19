import react from "react";
import styles from "./ListHeader.module.css";

function ListHeader() {
  return (
    <div className={styles.container}>
      <p className={styles.id}>ID</p>
      <p className={styles.name}>Business Name</p>
      <p className={styles.name}>Email</p>
      <p className={styles.name}>Phone</p>
      <p className={styles.name}>Contact</p>
      <p className={styles.name}>Fiscal Address</p>
      <p className={styles.actions}>Actions</p>
    </div>
  )
}

export default ListHeader;
