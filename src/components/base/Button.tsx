import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ 
  variant = "primary", 
  style, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    padding: "8px 16px",
    border: variant === "primary" ? "none" : "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: variant === "primary" ? "#007bff" : "white",
    color: variant === "primary" ? "white" : "#333",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.2s",
    ...style
  };

  return (
    <button style={baseStyle} {...props}>
      {children}
    </button>
  );
}
