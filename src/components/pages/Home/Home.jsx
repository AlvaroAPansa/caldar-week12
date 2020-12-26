import React from "react";
import styles from "./Home.module.css";
import Header from "../../shared/Header/Header";

function Home() {
  return (
    <div className={styles.container}>
      <Header title="Home" />
      <div>Home content</div>
    </div>
  );
}

export default Home;
