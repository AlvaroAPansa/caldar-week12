import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FILTER_RESOURCE,
  DELETE_RESOURCE_BEGIN,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAILURE,
} from "../types/table";

const initialState = {
  loading: false,
  error: null,
  rawData: null,
  header: [],
  commonActions: [],
  data: null,
};

export default function tableReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RESOURCE_BEGIN:
      return {
        ...initialState,
        loading: true,
        error: null,
        data: null,
        rawData: null,
      };

    case FETCH_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.resources,
        rawData: action.payload.resources,
      };

    case FETCH_RESOURCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
        rawData: null,
      };

    case FILTER_RESOURCE:
      return {
        ...state,
        data: state.rawData.filter((d) =>
          action.payload.excludeList.some((excludeTerm) =>
            d[excludeTerm].toLowerCase().includes(action.payload.text)
          )
        ),
      };

    case DELETE_RESOURCE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        rawData: state.rawData.filter((d) => d.id !== action.payload.id),
      };

    case DELETE_RESOURCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
