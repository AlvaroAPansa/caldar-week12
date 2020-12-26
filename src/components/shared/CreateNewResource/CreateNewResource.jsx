import React from "react";
import styles from "./CreateNewResource.module.css";

function CreateNewResource({ redirect, title }) {
  return (
    <button className={styles.addNewRes} onClick={redirect} title={title}>
      <span>+</span>
    </button>
  );
}

export default CreateNewResource;
