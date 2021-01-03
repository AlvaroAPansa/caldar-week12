import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Form, Field} from "react-final-form";
import styles from "./CustomerDetail.module.css";
import Header from "../../shared/Header/Header";
import {ENDPOINT_CUSTOMERS as BASE_ENDPOINT} from "../../../constants";
import {fetchResourceList, handleModifyFormData, handleSubmit} from "../../../redux/actions/customerActions";

function CustomerDetail( {match, history} ) {
  const {loading, error, formData} = useSelector(
    (s) => s.Customers_Selector
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

  function handleOnChange(e) {
    dispatch(handleModifyFormData(e));
  }

  function handleOnSubmit(values) {
    const parsedId = parseInt(values.id);
    let buildingsArray;
      
    if ((typeof values.buildings) === "string") {
      if (values.buildings.length === 0) {
        values.buildings = new Array();
      } else {
        values.buildings = values.buildings.split(",").map(Number);
      };
    }

    /*const parsedFormData = {
      ...formData,
      id: parsedId,
      buildings: buildingsArray,
    }*/

    dispatch(handleSubmit(values, history, match));
  }

  return (
    <div className={styles.container}>
      <Header 
        title={
          match.url.endsWith("new")
          ? "Create new customer"
          : "Edit technician"
        }
      />
      {loading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      <div className={styles.card}>
        <Form
          onSubmit = {handleOnSubmit}
          initialValues = {formData}
          render={({handleSubmit, values}) => (
            <form onSubmit={handleSubmit}>
              <label>ID</label>
                <Field
                  //disabled
                  name="id"
                  component="input"
                  type="text"
                />
              <label>Business Name</label>
                <Field
                  name="businessName"
                  component="input"
                  type="text"
                />
              <label>Contact Name</label>
                <Field 
                  name="contactName"
                  component="input"
                  type="text"
                />
              <label>Email</label>
                <Field 
                  name="email"
                  component="input"
                  type="text"
                />
              <label>Phone</label>
                <Field
                  name="phone"
                  component="input"
                  type="text"
                />
              <label>Fiscal Address</label>
                <Field 
                  name="fiscalAddress"
                  component="input"
                  type="text"
                />
              <label>Type</label>
                <Field name="type" component="select">
                  <option value="construction company">Construction Company</option>
                  <option value="particular">Particular</option>
                </Field>
              <label>Buildings</label>
                <Field 
                  name="buildings"
                  component="input"
                  type="text"
                />
              <div className={styles.buttons}>
                <input
                  type="button"
                  value="Back"
                  onClick={() => history.goBack()}
                />
                <input type="submit" value="Confirm" />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default CustomerDetail;