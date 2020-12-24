import styles from "./FormInput.module.css";

function FormInput( {name, type } ) {
  let idName = name.toLowerCase();
  let upCharacter = name.substring(idName.indexOf(' ')+1, idName.indexOf(' ')+2)
  if (idName.indexOf(' ') !== -1) {
    idName = idName.substring(0,idName.indexOf(' ')) + upCharacter + idName.substring(idName.indexOf(' ')+2);
  } else {
    idName = idName.substring(0,idName.indexOf(' ')) + idName.substring(idName.indexOf(' ')+1);
  }
    
  return (
    <div className={styles.container}>
    <label htmlFor={name}>
      <div>
        {name}
      </div>
      <input type={type} id={idName} name={name} className={styles.inputField} />
    </label>
  </div>
  )
}

export default FormInput;