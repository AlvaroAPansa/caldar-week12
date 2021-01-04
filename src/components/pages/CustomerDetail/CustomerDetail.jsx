import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Form, Field} from "react-final-form";
import styles from "./CustomerDetail.module.css";
import {ENDPOINT_CUSTOMERS as BASE_ENDPOINT} from "../../../constants";
import {clearFields, fetchResourceList, handleSubmit} from "../../../redux/actions/customerActions";
import { closeModal } from "../../../redux/actions/modalActions";
import { updateTable } from "../../../redux/actions/tableActions";
import Card from "../../shared/Card/Card";
import { composeValidators, mustBeEmail, required } from "../../shared/FormInputs/formsValidations";
import { TextInput, DropdownInput } from "../../shared/FormInputs/FormInputs";

function CustomerDetail( { id } ) {
  const {loading, error, formData} = useSelector(
    (s) => s.Customers_Selector
  );

  const dispatch = useDispatch();

  const types = ["construction company","particular"];

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

    if ((typeof values.buildings) === "string") {
      if (values.buildings.length === 0) {
        values.buildings = new Array();
      } else {
        values.buildings = values.buildings.split(",").map(Number);
      };
    }
 
    dispatch(
      handleSubmit(values, () => {
        dispatch(closeModal());
        dispatch(updateTable());
      })
    );
  }

  return (
    <Card title={!id ? "Create new customer" : "Edit customer"}>
      <div className={styles.container}>
        {loading && <h3>Loading...</h3>}
        {error && <h3>{error}</h3>}
        <Form
          onSubmit = {handleOnSubmit}
          initialValues = {formData}
          render={({handleSubmit, form, submitting, pristine}) => (
            <form onSubmit={handleSubmit}>
              <Field name="id">
                {(props) => <TextInput {...props} label="Id" /*disabled*/ />}
              </Field>
              <Field name="businessName" validate={required}>
                {(props) => <TextInput {...props} label="Business Name" />}
              </Field>
              <Field name="contactName" validate={required}>
                {(props) => <TextInput {...props} label="Contact Name" />}
              </Field>
              <Field name="email" validate={composeValidators(required, mustBeEmail)}>
                {(props) => <TextInput {...props} label="Email" />}
              </Field>
              <Field name="phone" validate={required}>
                {(props) => <TextInput {...props} label="Phone" />}
              </Field>
              <Field name="fiscalAddress" validate={required}>
                {(props) => <TextInput {...props} label="Fiscal Address" />}
              </Field>
              <Field name="type" validate={required}>
                {(props) => (
                  <DropdownInput 
                    label="Type" 
                    options={[
                      { value: "construction company", displayName: "Construction Company" },
                      { value: "particular", displayName: "Particular" },
                    ]}
                    {...props} 
                  />
                )}
              </Field>
              <Field name="buildings" validate={required}>
                {(props) => <TextInput {...props} label="Buildings" />}
              </Field>
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

export default CustomerDetail;