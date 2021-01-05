import { ENDPOINT_BOILERS as BASE_ENDPOINT } from "../../../constants";
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./BoilerDetail.module.css";
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
} from "../../../redux/actions/boilerActions"; // TODO las acciones de su recurso

function BoilerDetail({ id }) {
  console.log("ID", id);
  const { loading, error, formData } = useSelector(
    (s) => s.Boilers_Selector
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
    <Card title={!id ? "Create new boiler" : "Edit boiler"}>  
      <div className={styles.container}>
        {loading && <h3>Loading ...</h3>}
        {error && <h3>ERROR {error && error.message}</h3>}
        <Form 
          initialValues={formData}
          onSubmit={handleOnSubmit}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field name="id">
              {(props) => <TextInput {...props} label="Id" disabled />}
              </Field>

              <Field name="comment">
              {(props) => <TextInput {...props} label="Comment" />}
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

              <div className={styles.checkboxes}>
              <Field
                  name="status"
                  component="input"
                  type="checkbox"
                  value="Prearranged"
                  id="Prearranged"
                />
                <label htmlFor="Prearranged">Prearranged</label>
                <br />

              <Field
                  name="status"
                  component="input"
                  type="checkbox"
                  value="Available"
                  id="Available"
                />
                <label htmlFor="Available">Available</label>
                <br />
              
                <Field
                  name="status"
                  component="input"
                  type="checkbox"
                  value="Installed"
                  id="Installed"
                />
                <label htmlFor="Installed">Installed</label>
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


export default BoilerDetail;