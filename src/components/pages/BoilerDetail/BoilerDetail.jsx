import { ENDPOINT_BOILERS as BASE_ENDPOINT } from "../../../constants";
import React from "react";
import styles from "./BoilerDetail.module.css";
import Header from "../../shared/Header/Header";

// Custom hooks
import useFetch from "../../../hooks/useFetch";

function refactorData(data) {
  return {
    id: data.id,
    comments: data.comments,
    expertise: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      /*A: data.expertise.includes("A"),
      B: data.expertise.includes("B"),
      C: data.expertise.includes("C"),
      D: data.expertise.includes("D"),*/
    },
    status: {
      Prearranged: data.status.includes("Prearranged"),
      Available: data.status.includes("Available"),
      Installed: data.status.includes("Installed"),
    },
  };
}

function BoilerDetail({ match, history }) {
  const [formData, setFormData] = React.useState({
    // TODO estos son los nombres que tiene nuestros inputs
    id: "",
    comments: "",
    expertise: {
      A: false,
      B: false,
      C: false,
      D: false,
    },
    status: {
      Prearranged: false,
      Available: false,
      Installed: false,
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
        nState.expertise[e.target.name] = e.target.checked;
        nState.status[e.target.name] = e.target.checked;
      } else {
        nState[e.target.name] = e.target.value;
      }
      return nState;
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    const newBoiler = { ...formData };
    const expertise = [];
    if (newBoiler.expertise.A) expertise.push("A");
    if (newBoiler.expertise.B) expertise.push("B");
    if (newBoiler.expertise.C) expertise.push("C");
    if (newBoiler.expertise.D) expertise.push("D");
    newBoiler.expertise = expertise;
    const status = [];
    if (newBoiler.status.Prearranged) status.push("Prearranged");
    if (newBoiler.status.Available) status.push("Available");
    if (newBoiler.status.Installed) status.push("Installed");
    newBoiler.status = status;

    fetch(`${BASE_ENDPOINT}/${newBoiler.id ? newBoiler.id : ""}`, {
      method: newBoiler.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoiler),
    }).then((r) => {
      if (!r.ok) {
        alert("No se ha podido actualizar el stock!");
        return;
      }
      if (!newBoiler.id) {
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
            ? "Create new boiler"
            : "Edit boiler"
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
            <span>Comment</span>
            <br />
            <input
              type="text"
              value={formData.comments}
              name="comments"
              onChange={handleOnChange}
            />
          </label>
          <div className={styles.checkboxes}>
            <span>Expertise</span>
            <br />
            <input
              type="checkbox"
              name="A"
              value="A"
              id="A"
              checked={formData.expertise.A}
              onChange={handleOnChange}
            />
            <label htmlFor="A">A</label>
            <br />
            <input
              type="checkbox"
              name="B"
              value="B"
              id="B"
              checked={formData.expertise.B}
              onChange={handleOnChange}
            />
            <label htmlFor="B">B</label>
            <br />
            <input
              type="checkbox"
              name="C"
              value="C"
              id="C"
              checked={formData.expertise.C}
              onChange={handleOnChange}
            />
            <label htmlFor="C">C</label>
            <br />
            <input
              type="checkbox"
              name="D"
              value="D"
              id="D"
              checked={formData.expertise.D}
              onChange={handleOnChange}
            />
            <label htmlFor="D">D</label>
          </div>
          <div className={styles.checkboxes}>
            <span>Status</span>
            <br />
            <input
              type="checkbox"
              name="Prearranged"
              value="Prearranged"
              id="Prearranged"
              checked={formData.status.Prearranged}
              onChange={handleOnChange}
            />
            <label htmlFor="Prearranged">Prearranged</label>
            <br />
            <input
              type="checkbox"
              name="Available"
              value="Available"
              id="Available"
              checked={formData.status.Available}
              onChange={handleOnChange}
            />
            <label htmlFor="Available">Available</label>
            <br />
            <input
              type="checkbox"
              name="Installed"
              value="Installed"
              id="Installed"
              checked={formData.status.Installed}
              onChange={handleOnChange}
            />
            <label htmlFor="Installed">Installed</label>
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

export default BoilerDetail;