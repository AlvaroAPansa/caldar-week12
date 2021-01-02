import { CLOSE_MODAL, OPEN_MODAL } from "../types/modal";

export function openModal(render) {
  return {
    type: OPEN_MODAL,
    payload: { render },
  };
}
export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
