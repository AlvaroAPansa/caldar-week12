import styles from "./Modal.module.css";

import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/actions/modalActions";

export default function Modal() {
  const { open, render } = useSelector((s) => s.Modal_Selector);
  const dispatch = useDispatch();

  function handleOnClick() {
    dispatch(closeModal());
  }

  return (
    <>
      {open && (
        <>
          <div className={styles.modal} onClick={handleOnClick}></div>
          <div className={styles.container}>{render}</div>
        </>
      )}
    </>
  );
}
