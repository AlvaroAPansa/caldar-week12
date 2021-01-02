import React from "react";
import styles from "./Table.module.css";

function Table({ headers, data, actions, handleOnSearch }) {
  return (
    <div className={styles.card}>
      <div className={styles.searchContainer}>
        <input
          type="search"
          placeholder="Search ..."
          onChange={handleOnSearch}
        />
      </div>
      <table>
        <thead>
          <tr className="tr-th">
            {headers &&
              headers
                .sort((a, b) => (a.order < b.order ? -1 : 1))
                .map((h) => (
                  <th key={h.dataName} className={styles.th}>
                    {h.displayName}
                  </th>
                ))}
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                {headers.map((h) => (
                  <td key={item.id + h.dataName}>
                    {Array.isArray(item[h.dataName])
                      ? item[h.dataName].join(", ")
                      : item[h.dataName]}
                  </td>
                ))}
                <td className={styles.actions}>
                  {actions.map((a) => (
                    <button
                      key={item.id + a.displayName}
                      onClick={() => a.fn(item)}
                      title={a.hint}
                    >
                      {a.displayName}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
