import styles from "./YesNoMessage.module.css";
import Card from "../Card/Card";

export default function YesNoMessage({ title, message, onYes, onNo }) {
  return (
    <Card title={title}>
      <p>{message}</p>
      <div className={styles.buttons}>
        <button onClick={onNo}>No</button>
        <button onClick={onYes}>Yes</button>
      </div>
    </Card>
  );
}
