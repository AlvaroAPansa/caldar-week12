import React from "react";
import styles from "./Technicians.module.css";
import useFetch from "../../../hooks/useFetch";
import Header from "../../shared/Header/Header";
import Table from "../../shared/Table/Table";
import ButtonAdd from "../../shared/CreateNewResource/CreateNewResource";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResourceList,
  filterData,
  deleteResource,
} from "../../../redux/actions/tableActions";

import { ENDPOINT_TECHNICIANS as BASE_ENDPOINT } from "../../../constants"; // TODO cambiar el ENDPOINT_TECNHICIANS por lo que corresponda

function Technicians({ history }) {
  // const { data, loading, error } = useFetch(BASE_ENDPOINT);
  const { data, loading, error } = useSelector((s) => s.Table_Selector);
  const dispatch = useDispatch();
  const [myData, setMyData] = React.useState();

  React.useEffect(() => {
    dispatch(
      fetchResourceList({
        baseUrl: "https://rr-caldar.herokuapp.com/technicians",
        headers: [
          // TODO modifacar que recurso queremos motrar en la tabla
          {
            order: 0,
            displayName: "Id",
            dataName: "id",
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
          {
            order: 3,
            displayName: "Email",
            dataName: "email",
          },
          {
            order: 4,
            displayName: "Expertise",
            dataName: "expertise",
          },
        ],
        actions: [
          // TODO que acciones tiene que hacer cada fila (creería que no hay que tocarlo)
          {
            fn: (id) => history.push(`${history.location.pathname}/${id}`),
            displayName: "✏", // Edita el recurso
            hint: "Edit technician",
          },
          {
            fn: (id) => dispatch(deleteResource(id)),
            displayName: "❌", // Borra el recurso
            hint: "Delete technician",
          },
        ],
      })
    );
  }, []);

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
          displayName: "Last Name",
          dataName: "last_name",
        },
        {
          order: 1,
          displayName: "First Name",
          dataName: "first_name",
        },
        {
          order: 3,
          displayName: "Email",
          dataName: "email",
        },
        {
          order: 4,
          displayName: "Expertise",
          dataName: "expertise",
        },
      ],
      data,
      actions: [
        // TODO que acciones tiene que hacer cada fila (creería que no hay que tocarlo)
        {
          fn: (id) => history.push(`${history.location.pathname}/${id}`),
          displayName: "✏", // Edita el recurso
          hint: "Edit technician",
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
          hint: "Delete technician",
        },
      ],
    });
  }, [data]);

  function handleOnSearch(e) {
    const text = e.target.value.toLowerCase();
    // Filtra según los dataName definidos en headers
    // Ej, se filatraría buscando en 3 columnas
    dispatch(filterData(text, "first_name", "last_name", "email"));
  }

  return (
    <div className={styles.container}>
      <Header title="Technicians" />
      {loading && <h3>Loading ...</h3>}
      {error && <h3>{error}</h3>}
      {myData && <Table bundleData={myData} handleOnSearch={handleOnSearch} />}
      <ButtonAdd
        redirect={() => history.push(`${history.location.pathname}/new`)}
        title="Create new technician"
      />
    </div>
  );
}

export default Technicians;
