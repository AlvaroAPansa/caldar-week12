import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FORM_UPDATE_FIELD,
  FORM_SUBMIT_BEGIN,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILURE,
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
    buildings: data.buildings.join(),
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

    case FORM_UPDATE_FIELD:
      const input = action.payload.event.target;
      const nState = {...state};
      nState.formData[input.name] = input.value;
      return nState;

    case FORM_SUBMIT_BEGIN:
      return{
        ...state,
        loading: true,
        error: null,
      };

    case FORM_SUBMIT_SUCCESS:
      const nState1 = {...state, loading: false};
      if (!action.payload.newId) return nState1;
      nState1.formData.id = action.payload.newId;
      return nState1;

    case FORM_SUBMIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}