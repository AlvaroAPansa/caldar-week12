import { ENDPOINT_TECHNICIANS as BASE_ENDPOINT } from "../../../constants"; // TODO usar el que corresponda
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TechnicianDetail.module.css";
import Header from "../../shared/Header/Header";

import {
  fetchResourceList,
  handleModifyFormData,
  handleSubmit as handleSubmit_TE,
} from "../../../redux/actions/technicianActions"; // TODO las acciones de su recurso

import { Form, Field } from "react-final-form";

import {
  TextInput,
  DropdownInput,
  ChexboxInput,
} from "../../shared/FormInputs/FormInputs";

import {
  required,
  mustBeNumber,
  minValue,
  composeValidators,
  mustBeEmail,
} from "../../shared/FormInputs/formsValidations";

const onSubmit = async (values) => {
  window.alert(JSON.stringify(values, 0, 2));
};

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

  // function handleOnChange(e) {
  //   dispatch(handleModifyFormData(e));
  // }

  // function handleOnSubmit(e) {
  //   e.preventDefault();
  //   dispatch(handleSubmit_TE(formData, history, match));
  // }
  async function handleOnSubmit(values) {
    dispatch(handleSubmit_TE(values, history, match));
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
            render={({ handleSubmit, form, submitting, pristine, values }) => (
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
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                  <button type="button" onClick={() => history.goBack()}>
                    Back
                  </button>
                  <button type="submit" disabled={submitting || pristine}>
                    OK
                  </button>
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                </div>
              </form>
            )}
          />
        </div>
      )}
      <pre>{JSON.stringify(formData, 0, 2)}</pre>
    </div>
  );
}

export default TechnicianDetail;
