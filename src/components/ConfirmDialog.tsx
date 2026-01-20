import React from "react";
import { DialogProps } from "../types";
import { Dialog } from "./Dialog";

export function ConfirmDialog(props: DialogProps) {
  return <Dialog {...props} />;
}
