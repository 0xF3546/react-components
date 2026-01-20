import { ReactNode } from "react";
import { DialogProps } from "../types";
import React from "react";

interface DialogComponentProps extends DialogProps {
  children?: ReactNode;
}

export function Dialog({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  children
}: DialogComponentProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
      onClick={onCancel}
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
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer"
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer"
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
