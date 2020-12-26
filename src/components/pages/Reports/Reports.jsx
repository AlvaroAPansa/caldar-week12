import React from "react";
import styles from "./Reports.module.css";
import Header from "../../shared/Header/Header";

function Reports() {
  return (
    <div className={styles.container}>
      <Header title="Reports" />
      <div>Reports content</div>
    </div>
  );
}

export default Reports;
