import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./cutomerDetail.module.css";
import {ENDPOINT_CUSTOMERS as BASE_ENDPOINT} from "../../../constants";
import {fetchResourceList} from "../../../redux/actions/customerActions";

function CustomerDetail( {match, history} ) {
  const { loading, error, formData} = useSelector(
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
}