import { ENDPOINT_TECHNICIANS as BASE_ENDPOINT } from "../../../constants"; // TODO usar el que corresponda
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TechnicianDetail.module.css";
import Header from "../../shared/Header/Header";

import {
  fetchResourceList,
  handleModifyFormData,
} from "../../../redux/actions/technicianActions";

function TechnicianDetail({ match, history }) {
  const { loading, error, formData } = useSelector(
    (s) => s.Technicians_Selector
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchResourceList(
        "new" === match.params.id.toLowerCase()
          ? null
          : `${BASE_ENDPOINT}/${match.params.id}`
      )
    );
  }, []);

  function handleOnChange(e) {
    dispatch(handleModifyFormData(e));
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
      <Header
        title={
          ["new", "add", "+"].includes(match.params.id.toLowerCase())
            ? "Create new technician"
            : "Edit technician"
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

export default TechnicianDetail;
