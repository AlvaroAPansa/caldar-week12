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
import { closeModal, openModal } from "../../../redux/actions/modalActions";

import YesNoMessage from "../../shared/YesNoMessage/YesNoMessage";
import ScheduleDetail from "../ScheduleDetail/ScheduleDetail";


import { ENDPOINT_APPOINTMENTS as BASE_ENDPOINT } from "../../../constants";

function Schedule({ history }) {
  const { data, loading, error } = useSelector((s) => s.Table_Selector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchResourceList(BASE_ENDPOINT));
  }, []);

  function handleOnSearch(e) {
    const text = e.target.value.toLowerCase();
 

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
            
            {
              fn: (item) =>
                dispatch(openModal(<ScheduleDetail id={item.id} />)), // TODO cambiar detalle
              displayName: "✏", // Edita el recurso
              hint: "Edit schedule",
            },
            {
              fn: (item) =>
                dispatch(
                  openModal(
                    <YesNoMessage
                      Technicians            title="Delete Appointment"
                      message={`Are you sure you want to delete the Appointment ${item.id}`}
                      onYes={() => {
                        dispatch(deleteResource(item.id));
                        dispatch(closeModal());
                      }}
                      onNo={() => dispatch(closeModal())}
                    />
                  )
                ),
              displayName: "❌", // Borra el recurso
              hint: "Delete Appointment",
            },
          ]}
        />
      )}
      <ButtonAdd
        redirect={() => dispatch(openModal(<ScheduleDetail id={null} />))}
        title="Create new appointment"
      />
    </div>
  );
}

export default Schedule;
