import React from "react";
import styles from "./Boilers.module.css";
import useFetch from "../../../hooks/useFetch";
import Header from "../../shared/Header/Header";
import Table from "../../shared/Table/Table";
import ButtonAdd from "../../shared/CreateNewResource/CreateNewResource";

import { ENDPOINT_BOILERS as BASE_ENDPOINT } from "../../../constants"; // TODO cambiar el ENDPOINT_TECNHICIANS por lo que corresponda

function Boilers({ history }) {
  const { data, loading, error } = useFetch(BASE_ENDPOINT);
  const [myData, setMyData] = React.useState();
  React.useEffect(() => {
    if (!data) return;
    setMyData({
      headers: [
        // TODO modifacar que recurso queremos motrar en la tabla
        {
          order: 0,
          displayName: "Id",
          dataName: "id",
        },
        {
          order: 2,
          displayName: "Type",
          dataName: "typeId",
        },
        {
          order: 1,
          displayName: "Status",
          dataName: "status",
        },
        {
          order: 3,
          displayName: "Comments",
          dataName: "comments",
        },
      ],
      data,
      actions: [
        // TODO que acciones tiene que hacer cada fila (creería que no hay que tocarlo)
        {
          fn: (id) => history.push(`${history.location.pathname}/${id}`),
          displayName: "✏", // Edita el recurso
          hint: "Edit boiler",
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
          hint: "Delete boiler",
        },
      ],
    });
  }, [data]);

  function handleOnSearch(e) {
    const text = e.target.value.toLowerCase();
    setMyData((pS) => ({
      ...pS,
      data: data.filter(
        (d) =>
          d["first_name"].toLowerCase().includes(text) ||
          d["last_name"].toLowerCase().includes(text) ||
          d["email"].toLowerCase().includes(text)
      ),
    }));
  }

  return (
    <div className={styles.container}>
      <Header title="Boilers" />
      {loading && <h3>Loading ...</h3>}
      {error && <h3>ERROR: {error}</h3>}
      {myData && <Table bundleData={myData} handleOnSearch={handleOnSearch} />}
      <ButtonAdd
        redirect={() => history.push(`${history.location.pathname}/new`)}
        title="Create new boiler"
      />
    </div>
  );
}

export default Boilers;
