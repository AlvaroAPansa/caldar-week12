import { ENDPOINT_TECHNICIANS as BASE_ENDPOINT } from "../../../constants"; // TODO usar el que corresponda
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TechnicianDetail.module.css";
import Card from "../../shared/Card/Card";

import { Form, Field } from "react-final-form";
import { TextInput } from "../../shared/FormInputs/FormInputs"; // TODO el elemento que les guste o agregarlo
import {
  required,
  composeValidators,
  mustBeEmail,
} from "../../shared/FormInputs/formsValidations"; // TODO usar el validar que les guste o agregarlo

// Redux
import { closeModal } from "../../../redux/actions/modalActions";
import { updateTable } from "../../../redux/actions/tableActions";
import {
  fetchResourceList,
  handleSubmit,
  clearFields,
} from "../../../redux/actions/technicianActions"; // TODO las acciones de su recurso

function TechnicianDetail({ id }) {
  console.log("ID", id);
  const { loading, error, formData } = useSelector(
    (s) => s.Technicians_Selector
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearFields());
    dispatch(
      fetchResourceList({
        isNew: !id,
        url: {
          GET: `${BASE_ENDPOINT}/${id}`,
          PUT_POST: !id ? `${BASE_ENDPOINT}` : `${BASE_ENDPOINT}/${id}`,
        },
      })
    );
  }, [id]);

  async function handleOnSubmit(values) {
    dispatch(
      handleSubmit(values, () => {
        dispatch(closeModal());
        dispatch(updateTable());
      })
    );
  }

  return (
    <Card title={!id ? "Create new technician" : "Edit technician"}>
      <div className={styles.container}>
        {loading && <h3>Loading ...</h3>}
        {error && <h3>{error}</h3>}
        <Form
          initialValues={formData}
          onSubmit={handleOnSubmit}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              {/* TODO los que correspondan... */}
              <Field name="id">
                {(props) => <TextInput {...props} label="Id" disabled />}
              </Field>

              <Field name="first_name" validate={required}>
                {(props) => <TextInput {...props} label="First Name" />}
              </Field>

              <Field name="last_name" validate={required}>
                {(props) => <TextInput {...props} label="Last Name" />}
              </Field>

              <Field name="address" validate={required}>
                {(props) => <TextInput {...props} label="Address" />}
              </Field>

              <Field name="phone" validate={required}>
                {(props) => <TextInput {...props} label="Phone" />}
              </Field>

              <Field
                name="email"
                validate={composeValidators(required, mustBeEmail)}
              >
                {(props) => <TextInput {...props} label="Email" />}
              </Field>

              <div className={styles.checkboxes}>
                <span>Expertise</span>
                <br />
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="A"
                  id="A"
                />
                <label htmlFor="A">A</label>
                <br />
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="B"
                  id="B"
                />
                <label htmlFor="B">B</label>
                <br />
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="C"
                  id="C"
                />
                <label htmlFor="C">C</label>
                <br />
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="D"
                  id="D"
                />
                <label htmlFor="D">D</label>
              </div>
              <div className={styles.buttons}>
                <button type="button" onClick={() => dispatch(closeModal())}>
                  Close
                </button>
                <br />
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
                <br />
                <button type="submit" disabled={submitting || pristine}>
                  OK
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </Card>
  );
}

export default TechnicianDetail;
