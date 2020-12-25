import React from "react";
import styles from "./Schedule.module.css";
import Header from "../../shared/Header/Header";

function Schedule() {
  return (
    <div className={styles.container}>
      <Header title="Schedule" />
      <div>Schedule content</div>
    </div>
  );
}

export default Schedule;
