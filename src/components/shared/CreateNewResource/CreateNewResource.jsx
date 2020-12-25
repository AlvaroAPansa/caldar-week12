import React from "react";
import styles from "./CreateNewResource.module.css";

function CreateNewResource({ redirect }) {
  return (
    <button className="addNewRes" onClick={redirect}>
      +
    </button>
  );
}

export default CreateNewResource;
