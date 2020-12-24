import styles from "./SubmitButton.module.css";

function SubmitButton( { name } ) {
  return (
    <div className={styles.container}>
      <button type='submit'>
        {name}
      </button>
    </div>
    );
}

export default SubmitButton;