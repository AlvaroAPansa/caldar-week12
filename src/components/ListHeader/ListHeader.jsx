import react from "react";
import styles from "./ListHeader.module.css";

function ListHeader() {
  return (
    <thead className={styles.container}>
      <tr>
        <th className={styles.id}>ID</th>
        <th className={styles.name}>Business Name</th>
        <th className={styles.name}>Email</th>
        <th className={styles.name}>Phone</th>
        <th className={styles.name}>Contact</th>
        <th className={styles.name}>Fiscal Address</th>
        <th className={styles.actions}>Actions</th>
      </tr>
    </thead>
  )
}

export default ListHeader;
