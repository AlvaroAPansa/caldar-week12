import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FORM_UPDATE_FIELD,
} from "../types/technicians";

let url = "";

export function fetchResourceList(baseUrl) {
  return async (dispatch) => {
    if (!baseUrl) return dispatch(fetchResourceFailure("Error: Invalid URL"));

    url = baseUrl;

    dispatch(fetchResourceBegin());

    try {
      const response = await fetch(url);
      const json = await response.json();
      response.ok
        ? dispatch(fetchResourceSuccess(json))
        : dispatch(fetchResourceFailure(json));
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
