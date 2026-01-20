import React, { ReactNode } from "react";
import { DialogProvider } from "./DialogContext";
import { InputProvider } from "./InputContext";
import { ComponentOverrideContext, GlobalComponentOverrides } from "./ComponentOverrideContext";

interface ComponentContextProviderProps {
  children: ReactNode;
  components?: GlobalComponentOverrides;
}

export function ComponentContextProvider({ 
  children, 
  components = {} 
}: ComponentContextProviderProps) {
  return (
    <ComponentOverrideContext.Provider value={components}>
      <DialogProvider>
        <InputProvider>
          {children}
        </InputProvider>
      </DialogProvider>
    </ComponentOverrideContext.Provider>
  );
}
