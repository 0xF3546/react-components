import React, { InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, style, ...props }: CheckboxProps) {
  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  };

  const checkboxStyle: React.CSSProperties = {
    marginRight: "8px",
    cursor: "pointer",
    width: "16px",
    height: "16px",
    ...style
  };

  return (
    <label style={wrapperStyle}>
      <input type="checkbox" style={checkboxStyle} {...props} />
      {label && <span style={{ fontSize: "14px" }}>{label}</span>}
    </label>
  );
}
