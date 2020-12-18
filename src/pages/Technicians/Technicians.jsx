import React from "react";
import styles from "./Technicians.module.css";
import Header from "../../components/Header/Header";

function Technicians() {
  return (
    <div className={styles.container}>
      <Header title="Technicians" />
      <div>Technicians content</div>
    </div>
  );
}

export default Technicians;
