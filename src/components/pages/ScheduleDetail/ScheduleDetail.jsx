import { ENDPOINT_APPOINTMENTS as BASE_ENDPOINT } from "../../../constants"; // TODO usar el que corresponda
import React from "react";
import styles from "./ScheduleDetail.module.css";
import Header from "../../shared/Header/Header";

// Custom hooks
import useFetch from "../../../hooks/useFetch";

function refactorData(data) {
  return {
    id: data.id,
    start_timestamp: data.start_timestamp,
    end_timestamp: data.end_timestamp,
    buildingId: data.buildingId,
    boilerId: data.boilerId,
    maintenanceType: {
      Preventive: "Preventive",
      Eventual: "Eventual",
    },
  };
}
//   Preventive: data.maintenanceType.includes("Preventive"),
//   Eventual: data.maintenanceType.includes("Eventual"),

function ScheduleDetail({ match, history }) {
  const [formData, setFormData] = React.useState({
    // TODO estos son los nombres que tiene nuestros inputs
    id: "",
    start_timestamp: "",
    end_timestamp: "",
    buildingId: "",
    boilerId: "",
    maintenanceType: {
      Preventive: false,
      Eventual: false,
    },
  });

  const { data, loading, error } = useFetch(
    ["new", "add", "+"].includes(match.params.id.toLowerCase())
      ? null
      : `${BASE_ENDPOINT}/${match.params.id}`
  );

  React.useEffect(() => {
    if (!data || error) return;
    setFormData(refactorData(data));
  }, [data]);

  function handleOnChange(e) {
    return setFormData((pState) => {
      const nState = { ...pState };
      if (e.target.type === "checkbox") {
        nState.maintenanceType[e.target.name] = e.target.checked;
      } else {
        nState[e.target.name] = e.target.value;
      }
      return nState;
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    const newSchedule = { ...formData };
    const maintenanceType = [];
    if (newSchedule.maintenanceType.Preventive) maintenanceType.push("Preventive");
    if (newSchedule.maintenanceType.Eventual) maintenanceType.push("Eventual");
    newSchedule.maintenanceType = maintenanceType;

    fetch(`${BASE_ENDPOINT}/${newSchedule.id ? newSchedule.id : ""}`, {
      method: newSchedule.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSchedule),
    }).then((r) => {
      if (!r.ok) {
        alert("No se ha podido actualizar el Appointment!");
        return;
      }
      if (!newSchedule.id) {
        r.json().then((_data) => {
          history.push(`${match.path.replace(":id", _data.id)}`);
        });
      }
    });
  }

  return (
    <div className={styles.container}>
      <Header
        title={
          ["new", "add", "+"].includes(match.params.id.toLowerCase())
            ? "Create new appointment"
            : "Edit appointment"
        }
      />
      {loading && <h3>Loading ...</h3>}
      {error && <h3>ERROR {error && error.message}</h3>}
      <div className={styles.card}>
        <form onSubmit={handleOnSubmit}>
          <label>
            <span>Id</span>
            <br />
            <input
              disabled
              type="text"
              value={formData.id}
              name="id"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Starting Date</span>
            <br />
            <input
              type="text"
              value={formData.start_timestamp}
              name="start_timestamp"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Ending Date</span>
            <br />
            <input
              type="text"
              value={formData.end_timestamp}
              name="end_timestamp"
              onChange={handleOnChange}
            />
          </label>

          <label>
            <span>Building ID</span>
            <br />
            <input
              type="text"
              value={formData.buildingId}
              name="buildingId"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Boiler ID</span>
            <br />
            <input
              type="text"
              value={formData.boilerId}
              name="boilerId"
              onChange={handleOnChange}
            />
          </label>
          <div className={styles.checkboxes}>
            <span>Maintenance Type</span>
            <br />
            <input
              type="checkbox"
              name="Preventive"
              value="Preventive"
              id="Preventive"
              checked={formData.maintenanceType.Preventive}
              onChange={handleOnChange}
            />
            <label htmlFor="Preventive">Preventive</label>
            <br />
            <input
              type="checkbox"
              name="Eventual"
              value="Eventual"
              id="Eventual"
              checked={formData.maintenanceType.Eventual}
              onChange={handleOnChange}
            />
            <label htmlFor="Eventual">Eventual</label>
          </div>
          <div className={styles.buttons}>
            <input
              type="button"
              value="Back"
              onClick={() => history.goBack()}
            />
            <input type="submit" value="Confirm" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleDetail;
