import React from "react";
import styles from "./Schedule.module.css";
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
import { ENDPOINT_APPOINTMENTS as BASE_ENDPOINT } from "../../../constants";

function Schedule({ history }) {
  const { data, loading, error } = useSelector((s) => s.Table_Selector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchResourceList(BASE_ENDPOINT));
  }, []);

  function handleOnSearch(e) {
    const text = e.target.value;
    // Filtra según los dataName definidos en headers
    // Ej, se filatraría buscando en 3 columnas
    dispatch(filterData(text, "start_timestamp", "buildingId", "boilerId"));
  }

  return (
    <div className={styles.container}>
      <Header title="Schedule" />
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
              displayName: "ID",
              dataName: "id",
            },
            {
              order: 2,
              displayName: "Ending Date",
              dataName: "end_timestamp",
            },
            {
              order: 1,
              displayName: "Starting Date",
              dataName: "start_timestamp",
            },
            {
              order: 3,
              displayName: "Building ID",
              dataName: "buildingId",
            },
            {
              order: 4,
              displayName: "Boiler ID",
              dataName: "boilerId",
            },
          ]}
          actions={[
            // Acciones que hacer cada fila (creería que no hay que tocarlo)
            {
              fn: (id) => history.push(`${history.location.pathname}/${id}`),
              displayName: "✏", // Edita el recurso
              hint: "Edit appoinment",
            },
            {
              fn: (id) => dispatch(deleteResource(id)),
              displayName: "❌", // Borra el recurso
              hint: "Delete appointment",
            },
          ]}
        />
      )}
      <ButtonAdd
        redirect={() => history.push(`${history.location.pathname}/new`)}
        title="Create new appointment"
      />
    </div>
  );
}

export default Schedule;

