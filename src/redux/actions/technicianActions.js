import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FORM_SUBMIT_BEGIN,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILURE,
} from "../types/technicians";

let urlServer = "";
let isNewResource = true;

export function fetchResourceList({ isNew, url }) {
  return async (dispatch) => {
    if (!url) return dispatch(fetchResourceFailure("Error: Invalid URL"));
    urlServer = url;
    isNewResource = isNew;
    if (isNew) return;

    dispatch(fetchResourceBegin());

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

export function handleSubmit(formData, history, match) {
  return (dispatch) => {
    dispatch(formSubmitBegin());

    fetch(urlServer.PUT_POST, {
      method: isNewResource ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(
      (r) => {
        if (!r.ok)
          return dispatch(
            formSubmitFailure("No se ha podido actualizar el tecnico!")
          );

        if (isNewResource) {
          r.json().then((newData) => {
            dispatch(formSubmitSuccess(newData));
            return history.push(`${match.path.replace(":id", newData.id)}`);
          });
        }
        dispatch(formSubmitSuccess(formData));
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
function formSubmitSuccess(updatedData) {
  return {
    type: FORM_SUBMIT_SUCCESS,
    payload: updatedData,
  };
}

function formSubmitFailure(error) {
  return {
    type: FORM_SUBMIT_FAILURE,
    payload: { error },
  };
}
