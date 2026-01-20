import React, { ReactNode } from "react";
import { DialogProvider } from "./DialogContext";
import { InputProvider } from "./InputContext";

interface ComponentContextProviderProps {
  children: ReactNode;
}

export function ComponentContextProvider({ children }: ComponentContextProviderProps) {
  return (
    <DialogProvider>
      <InputProvider>
        {children}
      </InputProvider>
    </DialogProvider>
  );
}
