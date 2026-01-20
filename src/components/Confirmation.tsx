import { ReactNode } from "react";
import { ConfirmationProps } from "../types";
import React from "react";
import { Button } from "./base";

interface ConfirmationComponentProps extends ConfirmationProps {
  children?: ReactNode;
}

/**
 * Base confirmation component for both Modal and Dialog
 * @param closable - If true, allows closing by clicking overlay (default: true)
 * @param blur - If true, applies blur effect to background (default: false)
 */
export function Confirmation({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  closable = true,
  blur = false,
  components,
  children
}: ConfirmationComponentProps) {
  const ButtonComponent = components?.Button || Button;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: blur ? "blur(4px)" : undefined,
        WebkitBackdropFilter: blur ? "blur(4px)" : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
      onClick={closable ? onCancel : undefined}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          minWidth: "300px",
          maxWidth: "500px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 style={{ margin: "0 0 16px 0", fontSize: "20px" }}>
            {title}
          </h2>
        )}
        
        <p style={{ margin: "0 0 24px 0", color: "#666" }}>
          {message}
        </p>

        {children}

        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <ButtonComponent onClick={onCancel} variant="secondary">
            {cancelText}
          </ButtonComponent>
          <ButtonComponent onClick={onConfirm} variant="primary">
            {confirmText}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}
