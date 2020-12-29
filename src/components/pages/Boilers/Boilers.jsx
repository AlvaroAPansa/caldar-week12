import React from "react";
import styles from "./Boilers.module.css";
import Header from "../../shared/Header/Header";
import Table from "../../shared/Table/Table";
import ButtonAdd from "../../shared/CreateNewResource/CreateNewResource";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResourceList,
  filterData,
  deleteResource,
} from "../../../redux/actions/tableActions";

// TODO cambiar el ENDPOINT_TECNHICIANS por lo que corresponda
import { ENDPOINT_BOILERS as BASE_ENDPOINT } from "../../../constants";
import BoilerDetail from "../BoilerDetail/BoilerDetail";

function Boilers({ history }) {
  const { data, loading, error } = useSelector((s) => s.Table_Selector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchResourceList(BASE_ENDPOINT));
  }, []);

  function handleOnSearch(e) {
    const text = e.target.value.toLowerCase();
    // Filtra según los dataName definidos en headers
    // Ej, se filatraría buscando en 3 columnas
    dispatch(filterData(text, "status", "comment"));
  }

  return (
    <div className={styles.container}>
      <Header title="Boilers" />
      {loading && <h3>Loading ...</h3>}
      {error && <h3>{error}</h3>}
      {data && (
        <Table
          handleOnSearch={handleOnSearch}
          data={data}
          headers={[
            // TODO Estas son las columnas que mostraría la tabla, el dataName corresponde al valor del objecto devuelto por mongo ej, {id:12, last_name:"askljd"}
            {
              order: 0,
              displayName: "Id",
              dataName: "id",
            },
            {
              order: 2,
              displayName: "Type Id",
              dataName: "typeId",
            },
            {
              order: 1,
              displayName: "Status",
              dataName: "status",
            },
            {
              order: 3,
              displayName: "Comment",
              dataName: "comment",
            },
          ]}
          actions={[
            // Acciones que hacer cada fila (creería que no hay que tocarlo)
            {
              fn: (id) => history.push(`${history.location.pathname}/${id}`),
              displayName: "✏", // Edita el recurso
              hint: "Edit boiler",
            },
            {
              fn: (id) => dispatch(deleteResource(id)),
              displayName: "❌", // Borra el recurso
              hint: "Delete boiler",
            },
          ]}
        />
      )}
      <ButtonAdd
        redirect={() => history.push(`${history.location.pathname}/new`)}
        title="Create new boiler"
      />
    </div>
  );
}

export default Boilers;

