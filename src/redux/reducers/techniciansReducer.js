import {
  FETCH_RESOURCE_BEGIN,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  FORM_UPDATE_FIELD,
} from "../types/technicians";

const initialState = {
  loading: false,
  error: null,
  data: null,
  formData: {
    // TODO estos son los nombres que tiene nuestros inputs
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
    expertise: {
      A: false,
      B: false,
      C: false,
      D: false,
    },
  },
};

function refactorData(data) {
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    address: data.address,
    phone: data.phone,
    expertise: {
      A: data.expertise.includes("A"),
      B: data.expertise.includes("B"),
      C: data.expertise.includes("C"),
      D: data.expertise.includes("D"),
    },
  };
}

const a = (prevState, event) => {
  const nState = { ...prevState };
  if (event.target.type === "checkbox") {
    nState.expertise[event.target.name] = event.target.checked;
  } else {
    nState[event.target.name] = event.target.value;
  }
  return nState;
};

export default function techiciansReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RESOURCE_BEGIN:
      return {
        ...initialState,
        loading: true,
        error: null,
        data: null,
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
        data: null,
      };

    case FORM_UPDATE_FIELD:
      const input = action.payload.event.target;
      const nState = { ...state };
      if (input.type === "checkbox") {
        nState.formData.expertise[input.name] = input.checked;
      } else {
        nState.formData[input.name] = input.value;
      }
      return nState;

    default:
      return state;
  }
}
