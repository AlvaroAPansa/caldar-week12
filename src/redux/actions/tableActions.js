import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FILTER_RESOURCE,
  DELETE_RESOURCE_BEGIN,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAILURE,
} from "../types/table";

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

const fetchResourceBegin = () => ({
  type: FETCH_RESOURCE_BEGIN,
});

const fetchResourceSuccess = (resources) => ({
  type: FETCH_RESOURCE_SUCCESS,
  payload: { resources },
});

const fetchResourceFailure = (error) => ({
  type: FETCH_RESOURCE_FAILURE,
  payload: { error },
});

export function filterData(text, ...excludeList) {
  return {
    type: FILTER_RESOURCE,
    payload: { text, excludeList },
  };
}

export function deleteResource(id) {
  return (dispatch) => {
    dispatch(deleteResourceBegin());
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        return r.ok
          ? dispatch(deleteResourceSuccess(id))
          : dispatch(deleteResourceError("No se ha podido borrar el usuario."));
      })
      .catch((error) => dispatch(deleteResourceError(error)));
  };
}

const deleteResourceBegin = () => {
  return {
    type: DELETE_RESOURCE_BEGIN,
  };
};

const deleteResourceSuccess = (id) => {
  return {
    type: DELETE_RESOURCE_SUCCESS,
    payload: { id },
  };
};
const deleteResourceError = (error) => ({
  type: DELETE_RESOURCE_FAILURE,
  payload: { error },
});

export function updateTable() {
  return async (dispatch) => {
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
