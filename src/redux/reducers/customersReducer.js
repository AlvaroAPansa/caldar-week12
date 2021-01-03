import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FORM_SUBMIT_BEGIN,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILURE,
  FETCH_RESOURCE_CLEAR_FIELDS,
} from "../types/customers";

const initialState = {
  loading: false,
  error: null,
  formData: {
    id: "",
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    fiscalAddress: "",
    type: "",
    buildings: [],
  },
};

function refactorData(data) {
  return {
    id: data.id,
    businessName: data.businessName,
    contactName: data.contactName,
    email: data.email,
    phone: data.phone,
    fiscalAddress: data.fiscalAddress,
    type: data.type,
    buildings: data.buildings,
  };
}

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RESOURCE_BEGIN:
      return{
        ...initialState,
        loading: true,
        error: null,
      };

    case FETCH_RESOURCE_SUCCESS:
      return{
        ...state,
        loading: false,
        formData: refactorData(action.payload.resources),
      };

    case FETCH_RESOURCE_FAILURE:
      return{
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case FORM_SUBMIT_BEGIN:
      return{
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