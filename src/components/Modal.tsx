import React from "react";
import { ModalProps } from "../types";
import { Confirmation } from "./Confirmation";

export function Modal(props: ModalProps) {
  return <Confirmation {...props} closable={false} blur={props.blur ?? true} />;
}
