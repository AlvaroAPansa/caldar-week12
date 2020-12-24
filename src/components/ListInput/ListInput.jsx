import styles from "./ListInput.module.css";

function ListInput( {name} ) {
  let idName = name.toLowerCase();
  idName = idName.substring(0,idName.indexOf(' ')) + idName.substring(idName.indexOf(' ')+1);

  return (
    <div className={styles.container}>
      <label htmlFor={name}>
        <div>
          {name}
        </div>
        <input list='types' id={name} name={name} className={styles.inputField} />
      </label>
      <datalist id='types'>
        <option value='Particular' />
        <option value='Construciton Company' />
      </datalist>
    </div>
  )
}

export default ListInput;