import React, { SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({ error, style, children, ...props }: SelectProps) {
  const baseStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    border: `1px solid ${error ? "#f44336" : "#ddd"}`,
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "white",
    cursor: "pointer",
    transition: "border-color 0.2s",
    ...style
  };

  return (
    <select style={baseStyle} {...props}>
      {children}
    </select>
  );
}
