import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FORM_SUBMIT_BEGIN,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILURE,
  FETCH_RESOURCE_CLEAR_FIELDS,
} from "../types/schedule";

const initialState = {
  loading: false,
  error: null,
  formData: {
    // TODO estos son los nombres que tiene nuestros inputs del form
    id: "",
    start_timestamp: "",
    end_timestamp: "",
    buildingId: "",
    boilerId: "",
    maintenanceType: "",
  },
};

function refactorData(data) {
  return {
    id: data.id,
    start_timestamp: data.start_timestamp,
    end_timestamp: data.end_timestamp,
    buildingId: data.buildingId,
    boilerId: data.boilerId,
    maintenanceType: data.maintenanceType,
  };
}

export default function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RESOURCE_BEGIN:
      return {
        ...initialState,
        loading: true,
        error: null,
      };

    case FETCH_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        formData: refactorData(action.payload.resources),
      };

    case FETCH_RESOURCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case FORM_SUBMIT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        formData: refactorData(action.payload),
      };

    case FORM_SUBMIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case FETCH_RESOURCE_CLEAR_FIELDS:
      return { ...initialState };

    default:
      return state;
  }
}
