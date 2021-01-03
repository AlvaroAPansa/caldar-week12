import { CLOSE_MODAL, OPEN_MODAL } from "../types/modal";

const initialState = {
  open: false,
  render: null,
};

export default function modalReducer(state = initialState, actions) {
  switch (actions.type) {
    case OPEN_MODAL:
      return { ...state, open: true, render: actions.payload.render };
    case CLOSE_MODAL:
      return { ...state, open: false };
    default:
      return state;
  }
}
