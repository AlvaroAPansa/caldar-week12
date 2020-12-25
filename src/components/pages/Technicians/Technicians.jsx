import React from "react";
import styles from "./Technicians.module.css";
import useFetch from "../../../hooks/useFetch";
import Header from "../../shared/Header/Header";
import Table from "../../shared/Table/Table";

import { ENDPOINT_TECHNICIANS as BASE_ENDPOINT } from "../../../constants"; // TODO cambiar el ENDPOINT_TECNHICIANS por lo que corresponda

function Technicians({ history }) {
  const { data, loading, error } = useFetch(BASE_ENDPOINT);
  const [myData, setMyData] = React.useState();
  React.useEffect(() => {
    if (!data) return;
    setMyData({
      headers: [
        // TODO modifacar que recurso queremos motrar en la tabla
        {
          order: 3,
          displayName: "Email",
          dataName: "email",
        },
        {
          order: 2,
          displayName: "Last Name",
          dataName: "last_name",
        },
        {
          order: 1,
          displayName: "First Name",
          dataName: "first_name",
        },
      ],
      data,
      actions: [
        // TODO que acciones tiene que hacer cada fila (creería que no hay que tocarlo)
        {
          fn: (id) => history.push(`${history.location.pathname}/${id}`),
          displayName: "✏", // Edita el recurso
        },
        {
          fn: (id) =>
            fetch(`${BASE_ENDPOINT}/${id}`, {
              method: "DELETE",
            }).then((r) => {
              if (!r.ok) {
                alert("No se ha podido borrar el usuario.");
                return;
              }
              setMyData((d) => ({
                ...d,
                data: d.data.filter((q) => q.id !== id),
              }));
            }),
          displayName: "❌", // Borra el recurso
        },
      ],
    });
  }, [data]);

  return (
    <div className={styles.container}>
      <Header title="Technicians" />
      <div>Technicians content</div>
      {loading && <h3>Loading ...</h3>}
      {error && <h3>ERROR: {error}</h3>}
      {myData && <Table bundleData={myData} />}
    </div>
  );
}

export default Technicians;
