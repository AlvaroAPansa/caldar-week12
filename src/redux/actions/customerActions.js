import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FORM_UPDATE_FIELD,
  FORM_SUBMIT_BEGIN,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILURE,
} from "../types/customers";

let urlServer = "";
let isNewResource = true;

export function fetchResourceList({isNew, url}) {
  return async (dispatch) => {
    if(!url) return dispatch(fetchResourceFailure("Error: Invalid URL"));
    urlServer = url;
    isNewResource = isNew;
    if (isNew) return;

    dispatch (fetchResourceBegin());

    try {
      const response = await fetch(urlServer.GET);
      const json = await response.json();
      response.ok
        ? dispatch(fetchResourceSuccess(json))
        : dispatch(fetchResourceFailure(json.message));
    } catch (error) {
      dispatch(fetchResourceFailure(error.message));
    }
  };
}

function fetchResourceBegin() {
  return {
    type: FETCH_RESOURCE_BEGIN,
  };
}

function fetchResourceSuccess(resources) {
  return {
    type: FETCH_RESOURCE_SUCCESS,
    payload: { resources },
  };
}

function fetchResourceFailure(error) {
  return {
    type: FETCH_RESOURCE_FAILURE,
    payload: { error },
  };
}

export function handleModifyFormData(event) {
  return {
    type: FORM_UPDATE_FIELD,
    payload: { event },
  };
}

export function handleSubmit(formData, history, match) {
  return (dispatch) => {
    dispatch(formSubmitBegin());

    const formParsedData = {...formData};

    fetch(urlServer.PUT_POST, {
      method: isNewResource ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formParsedData),
    }).then(
      (r) => {
        if (!r.ok)
        return dispatch(
          formSubmitFailure("Customer update failed!")
        );

        let newId = "";
        if (isNewResource) {
          r.json().then((_data) => {
            newId = _data.id;
            dispatch(formSubmitSuccess());
            return history.push(`${match.path.replace(":id", newId)}`);
          });
        }
        dispatch(formSubmitSuccess());
      },
      (error) => dispatch(formSubmitFailure(error.message))
    );
  };
}

function formSubmitBegin() {
  return {
    type: FORM_SUBMIT_BEGIN,
  };
}
function formSubmitSuccess(newId) {
  return {
    type: FORM_SUBMIT_SUCCESS,
    payload: { newId },
  };
}

function formSubmitFailure(error) {
  return {
    type: FORM_SUBMIT_FAILURE,
    payload: { error },
  };
}