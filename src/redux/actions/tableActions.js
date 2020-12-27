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

export function fetchResourceList({ baseUrl, headers, actions }) {
  return async (dispatch) => {
    if (!baseUrl) return;
    url = baseUrl;
    dispatch(fetchResourceBegin(headers, actions));
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

const fetchResourceBegin = (headers, actions) => ({
  type: FETCH_RESOURCE_BEGIN,
  payload: { headers, actions },
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
    }).then((r) => {
      return dispatch(deleteResourceError("PUTO"));
      if (!r.ok) {
        alert("No se ha podido borrar el usuario.");
        return;
      }
      // setMyData((d) => ({
      //   ...d,
      //   data: d.data.filter((q) => q.id !== id),
      // }));

      return {
        type: FILTER_RESOURCE,
        payload: { id },
      };
    });
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
