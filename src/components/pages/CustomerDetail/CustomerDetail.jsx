import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(handleSubmit(formData, history, match));
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
        <form onSubmit={handleOnSubmit}>
          <label>
            <span>ID</span>
            <br/>
            <input 
              //disabled
              type="text"
              value={formData.id}
              name="id"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Business Name</span>
            <br/>
            <input 
              type="text"
              value={formData.businessName}
              name="businessName"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Contact Name</span>
            <br/>
            <input 
              type="text"
              value={formData.contactName}
              name="contactName"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Email</span>
            <br/>
            <input 
              type="text"
              value={formData.email}
              name="email"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Phone</span>
            <br/>
            <input 
              type="text"
              value={formData.phone}
              name="phone"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Fiscal Address</span>
            <br/>
            <input 
              type="text"
              value={formData.fiscalAddress}
              name="fiscalAddress"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Type</span>
            <br/>
            <input 
              type="text"
              value={formData.type}
              name="type"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <span>Buildings</span>
            <br/>
            <input 
              type="text"
              value={formData.buildings}
              name="buildings"
              onChange={handleOnChange}
            />
          </label>
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

export default CustomerDetail;