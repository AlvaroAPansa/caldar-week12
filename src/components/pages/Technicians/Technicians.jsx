import React from "react";
import styles from "./Technicians.module.css";
import Header from "../../shared/Header/Header";
import Table from "../../shared/Table/Table";
import ButtonAdd from "../../shared/CreateNewResource/CreateNewResource";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResourceList,
  filterData,
  deleteResource,
} from "../../../redux/actions/tableActions";
import { closeModal, openModal } from "../../../redux/actions/modalActions";

import YesNoMessage from "../../shared/YesNoMessage/YesNoMessage";

// TODO cambiar el ENDPOINT_TECNHICIANS por lo que corresponda
import { ENDPOINT_TECHNICIANS as BASE_ENDPOINT } from "../../../constants";

function Technicians({ history }) {
  const { data, loading, error } = useSelector((s) => s.Table_Selector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchResourceList(BASE_ENDPOINT));
  }, []);

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
          ]}
          actions={[
            // Acciones que hacer cada fila (creería que no hay que tocarlo)
            {
              fn: (item) =>
                history.push(`${history.location.pathname}/${item.id}`),
              displayName: "✏", // Edita el recurso
              hint: "Edit technician",
            },
            {
              fn: (item) =>
                dispatch(
                  openModal(
                    <YesNoMessage
                      title="Delete Technician"
                      message={`Are you sure you want to delete the technician ${item.first_name}`}
                      onYes={() => {
                        dispatch(deleteResource(item.id));
                        dispatch(closeModal());
                      }}
                      onNo={() => dispatch(closeModal())}
                    />
                  )
                ),
              displayName: "❌", // Borra el recurso
              hint: "Delete technician",
            },
          ]}
        />
      )}
      <ButtonAdd
        redirect={() => history.push(`${history.location.pathname}/new`)}
        title="Create new technician"
      />
    </div>
  );
}

export default Technicians;
