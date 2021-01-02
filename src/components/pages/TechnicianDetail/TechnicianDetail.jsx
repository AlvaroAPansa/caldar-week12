import { ENDPOINT_TECHNICIANS as BASE_ENDPOINT } from "../../../constants"; // TODO usar el que corresponda
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TechnicianDetail.module.css";
import Header from "../../shared/Header/Header";

import {
  fetchResourceList,
  handleSubmit,
} from "../../../redux/actions/technicianActions"; // TODO las acciones de su recurso

import { Form, Field } from "react-final-form";

import { TextInput } from "../../shared/FormInputs/FormInputs"; // TODO el elemento que les guste o agregarlo

import {
  required,
  composeValidators,
  mustBeEmail,
} from "../../shared/FormInputs/formsValidations"; // TODO usar el validar que les guste o agregarlo

function TechnicianDetail({ match, history }) {
  const { loading, error, formData } = useSelector(
    (s) => s.Technicians_Selector
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchResourceList({
        isNew: match.url.endsWith("new"),
        url: {
          GET: `${BASE_ENDPOINT}/${match.params.id}`,
          PUT_POST: match.url.endsWith("new")
            ? `${BASE_ENDPOINT}`
            : `${BASE_ENDPOINT}/${match.params.id}`,
        },
      })
    );
  }, [history]);

  async function handleOnSubmit(values) {
    dispatch(handleSubmit(values, history, match));
  }

  return (
    <div className={styles.container}>
      <Header
        title={
          match.url.endsWith("new")
            ? "Create new technician"
            : "Edit technician"
        }
      />
      {loading && <h3>Loading ...</h3>}
      {error && <h3>{error}</h3>}
      {!loading && (
        <div className={styles.card}>
          {/* TODO los que correspondan... */}
          <Form
            initialValues={formData}
            onSubmit={handleOnSubmit}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <Field name="id">
                  {(props) => <TextInput {...props} label="Id" disabled />}
                </Field>

                <Field name="first_name" validate={required}>
                  {(props) => <TextInput {...props} label="First Name" />}
                </Field>

                <Field name="last_name" validate={required}>
                  {(props) => <TextInput {...props} label="Last Name" />}
                </Field>

                <Field name="address">
                  {(props) => <TextInput {...props} label="Address" />}
                </Field>

                <Field name="phone">
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
                  <button type="button" onClick={() => history.goBack()}>
                    Back
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
      )}
    </div>
  );
}

export default TechnicianDetail;
