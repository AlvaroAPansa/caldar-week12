import React from "react";
import styles from "./Boilers.module.css";
import Header from "../../components/Header/Header";

function Boilers() {
  return (
    <div className={styles.container}>
      <Header title="Boilers" />
      <div>Boilers content</div>
    </div>
  );
}

export default Boilers;
