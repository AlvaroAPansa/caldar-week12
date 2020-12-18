import React from "react";
import styles from "./Settings.module.css";
import Header from "../../components/Header/Header";

function Settings() {
  return (
    <div className={styles.container}>
      <Header title="Settings" />
      <div>Settings content</div>
    </div>
  );
}

export default Settings;
