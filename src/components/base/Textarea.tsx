import React, { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, style, ...props }: TextareaProps) {
  const baseStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    border: `1px solid ${error ? "#f44336" : "#ddd"}`,
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    transition: "border-color 0.2s",
    ...style
  };

  return <textarea style={baseStyle} {...props} />;
}
