import react from "react";
import styles from "./CustomerItem.module.css";

function CustomerItem( {customer} ) {

  return (
    <tbody>
      <tr className={styles.container}>
        <td className={styles.id}>
          {customer.id}
        </td>
        <td className={styles.name}>
          {customer.businessName}
        </td>
        <td className={styles.name}>
          {customer.email}
        </td>
        <td className={styles.name}>
          {customer.phone}
        </td>
        <td className={styles.name}>
          {customer.contact}
        </td>
        <td className={styles.name}>
          {customer.fiscalAddress}
        </td>
        <td className={styles.actions}>
          <i className='material-icons'>
            create
          </i>
          <i className='material-icons'>
            delete
          </i>
        </td>
      </tr>
    </tbody>
  )
}

export default CustomerItem;