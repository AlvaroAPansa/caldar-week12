import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FORM_UPDATE_FIELD,
  FORM_SUBMIT_BEGIN,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILURE,
} from "../types/technicians";

const initialState = {
  loading: false,
  error: null,
  formData: {
    // TODO estos son los nombres que tiene nuestros inputs del form
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
    expertise: [],
    // expertise: {
    //   A: false,
    //   B: false,
    //   C: false,
    //   D: false,
    // },
  },
};

function refactorData(data) {
  /*
  TODO expertise me viene en un array y yo lo muestro como checkboxes.
  por eso cuando le pegue al servidor y me devuelve el dato, lo que hago es
  "convertirlo" tal cual lo uso en el form.

  Mongo agrega mas data que no nos interesa, la sacamos "filtrando" lo que necesitamos.
  */
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    address: data.address,
    phone: data.phone,
    expertise: data.expertise,
  };
}

export default function techiciansReducer(state = initialState, action) {
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
        // formData: refactorData(action.payload.resources),
        formData: refactorData(action.payload.resources),
      };

    case FETCH_RESOURCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // case FORM_UPDATE_FIELD:
    //   const input = action.payload.event.target;
    //   const nState = { ...state };
    //   // TODO como tengo checkboxes no toda la data entra de una en mi formData
    //   if (input.type === "checkbox") {
    //     nState.formData.expertise[input.name] = input.checked;
    //   } else {
    //     nState.formData[input.name] = input.value;
    //   }
    //   return nState;

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
    // const nState1 = { ...state, loading: false };
    // if (!action.payload.newId) return nState1;
    // nState1.formData = action.payload;
    // return nState1;

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
