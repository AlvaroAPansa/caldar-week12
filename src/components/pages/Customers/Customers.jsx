import React from "react";
import styles from "./Customers.module.css";
import Header from "../../shared/Header/Header";
import Table from "../../shared/Table/Table";
import {useSelector, useDispatch} from "react-redux";
import {fetchResourceList, filterData, deleteResource} from "../../../redux/actions/tableActions"
import {ENDPOINT_CUSTOMERS as BASE_ENDPOINT} from "../../../constants";

function Customers({history}) {
  const { data, loading, error } = useSelector((s) => s.Table_Selector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchResourceList(BASE_ENDPOINT));
  }, []);

  function handleOnSearch(e) {
    const text = e.target.value.toLowerCase();
    dispatch(filterData(text, "business_name", "contact_name", "email"));
  }

  return (
    <div className={styles.container}>
      <Header title="Customers" />
      {loading && <h3>Loading ...</h3>}
      {error && <h3>{error}</h3>}
      {data && (
        <Table 
          handleOnSearch={handleOnSearch}
          data={data}
          headers={[
            {
              order: 0,
              displayName: "ID",
              dataName: "id",
            },
            {
              order: 1,
              displayName: "Business Name",
              dataName: "businessName",
            },
            {
              order: 2,
              displayName: "Contact Name",
              dataName: "contactName",
            },
            {
              order: 3,
              displayName: "Email",
              dataName: "email",
            },
            {
              order: 4,
              displayName: "Phone",
              dataName: "phone",
            },
            {
              order: 5,
              displayName: "Fiscal Address",
              dataName: "fiscalAddress",
            },
          ]}
          actions={[
            {
              fn: (id) => history.push(`${history.location.pathname}/${id}`),
              displayName: "✏",
              hint: "Edit customer",
            },
            {
              fn: (id) => dispatch(deleteResource(id)),
              displayName: "❌",
              hint: "Delete customer",
            },
          ]}
        />
      )}
    </div>
  );
}

export default Customers;
