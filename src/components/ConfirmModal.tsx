import React from "react";
import { ModalProps } from "../types";
import { Modal } from "./Modal";

export function ConfirmModal(props: ModalProps) {
  return <Modal {...props} />;
}
