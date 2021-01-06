import { ENDPOINT_APPOINTMENTS as BASE_ENDPOINT } from "../../../constants"; // TODO usar el que corresponda
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ScheduleDetail.module.css";
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
} from "../../../redux/actions/scheduleActions"; // TODO las acciones de su recurso

function ScheduleDetail({ id }) {
  console.log("ID", id);
  const { loading, error, formData } = useSelector(
    (s) => s.Schedule_Selector
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
    <Card title={!id ? "Create new appointment" : "Edit appointment"}>
      <div className={styles.container}>
        {loading && <h3>Loading...</h3>}
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

              <Field name="start_timestamp" validate={required}>
                {(props) => <TextInput {...props} label="Starting Date" />}
              </Field>

              <Field name="end_timestamp" validate={required}>
                {(props) => <TextInput {...props} label="Ending Date" />}
              </Field>

              <Field name="buildingId" validate={required}>
                {(props) => <TextInput {...props} label="Building ID" />}
              </Field>

              <Field name="boilerId" validate={required}>
                {(props) => <TextInput {...props} label="Boiler ID" />}
              </Field>

              <div className={styles.checkboxes}>
                <span>Maintenance Type</span>
                <br />
                <Field
                  name="maintenanceType"
                  component="input"
                  type="checkbox"
                  value="Preventive"
                  id="Preventive"
                />
                <label htmlFor="Preventive">Preventive</label>
                <br />
                <Field
                  name="maintenanceType"
                  component="input"
                  type="checkbox"
                  value="Eventual"
                  id="Eventual"
                />
                <label htmlFor="Eventual">Eventual</label>
                <br />
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

export default ScheduleDetail;
