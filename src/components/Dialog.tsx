import React from "react";
import { DialogProps } from "../types";
import { Confirmation } from "./Confirmation";

export function Dialog(props: DialogProps) {
  return <Confirmation {...props} closable={true} blur={props.blur ?? false} />;
}
