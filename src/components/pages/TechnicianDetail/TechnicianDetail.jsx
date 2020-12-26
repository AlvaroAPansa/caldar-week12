import { ENDPOINT_TECHNICIANS as BASE_ENDPOINT } from "../../../constants"; // TODO usar el que corresponda
import React from "react";
import styles from "./TechnicianDetail.module.css";
import Header from "../../shared/Header/Header";

// Custom hooks
import useFetch from "../../../hooks/useFetch";

function refactorData(data) {
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    address: data.address,
    phone: data.phone,
    expertise: {
      A: data.expertise.includes("A"),
      B: data.expertise.includes("B"),
      C: data.expertise.includes("C"),
      D: data.expertise.includes("D"),
    },
  };
}

function TechnicianDetail({ match, history }) {
  const [formData, setFormData] = React.useState({
    // TODO estos son los nombres que tiene nuestros inputs
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
    expertise: {
      A: false,
      B: false,
      C: false,
      D: false,
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
      } else {
        nState[e.target.name] = e.target.value;
      }
      return nState;
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    const newTech = { ...formData };
    const expertise = [];
    if (newTech.expertise.A) expertise.push("A");
    if (newTech.expertise.B) expertise.push("B");
    if (newTech.expertise.C) expertise.push("C");
    if (newTech.expertise.D) expertise.push("D");
    newTech.expertise = expertise;

    fetch(`${BASE_ENDPOINT}/${newTech.id ? newTech.id : ""}`, {
      method: newTech.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTech),
    }).then((r) => {
      if (!r.ok) {
        alert("No se ha podido actualizar el tecnico!");
        return;
      }
      if (!newTech.id) {
        r.json().then((_data) => {
          history.push(`${match.path.replace(":id", _data.id)}`);
        });
      }
    });
  }

  return (
    <div className={styles.container}>
      <Header title="TechnicianDetail" />
      <div>TechnicianDetail content</div>
      {loading && <h3>Loading ...</h3>}
      {error && <h3>ERROR {error && error.message}</h3>}
      <>
        <form onSubmit={handleOnSubmit}>
          <label>
            <span>First Name</span>
            <br />
            <input
              type="text"
              value={formData.first_name}
              name="first_name"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Last Name</span>
            <br />
            <input
              type="text"
              value={formData.last_name}
              name="last_name"
              onChange={handleOnChange}
            />
          </label>
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
            <span>Address</span>
            <br />
            <input
              type="text"
              value={formData.address}
              name="address"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Phone</span>
            <br />
            <input
              type="text"
              value={formData.phone}
              name="phone"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Email</span>
            <br />
            <input
              type="text"
              value={formData.email}
              name="email"
              onChange={handleOnChange}
            />
          </label>
          <div className="checkboxes">
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
          <input type="button" value="Back" onClick={() => history.goBack()} />
          <input type="submit" value="Confirm" />
        </form>
      </>
    </div>
  );
}

export default TechnicianDetail;
