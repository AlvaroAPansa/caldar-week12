import styles from "./OkMessage.module.css";
import Card from "../Card/Card";

export default function OkMessage({ title, message, onOk }) {
  return (
    <Card title={title}>
      <p>{message}</p>
      <div className={styles.buttons}>
        <button onClick={onOk}>Ok</button>
      </div>
    </Card>
  );
}
