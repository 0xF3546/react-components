import { ComponentType, createContext, useContext } from "react";
import { ButtonProps, InputProps, TextareaProps, SelectProps, CheckboxProps } from "../components/base";

export interface GlobalComponentOverrides {
  Button?: ComponentType<ButtonProps>;
  Input?: ComponentType<InputProps>;
  Textarea?: ComponentType<TextareaProps>;
  Select?: ComponentType<SelectProps>;
  Checkbox?: ComponentType<CheckboxProps>;
}

const ComponentOverrideContext = createContext<GlobalComponentOverrides>({});

export function useComponentOverrides() {
  return useContext(ComponentOverrideContext);
}

export { ComponentOverrideContext };
