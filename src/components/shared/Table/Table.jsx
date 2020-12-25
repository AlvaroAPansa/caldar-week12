import React from "react";

function Table({ bundleData: { headers, data, actions } }) {
  return (
    <div>
      <table>
        <thead>
          <tr className="tr-th">
            {headers &&
              headers
                .sort((a, b) => (a.order < b.order ? -1 : 1))
                .map((h) => (
                  <th key={h.dataName} className="th">
                    {h.displayName}
                  </th>
                ))}
            <th className="th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                {headers.map((h) => (
                  <td key={item.id + h.dataName} className="td">
                    {item[h.dataName]}
                  </td>
                ))}
                <td className="td">
                  {actions.map((a) => (
                    <button
                      key={item.id + a.displayName}
                      onClick={() => a.fn(item.id)}
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
