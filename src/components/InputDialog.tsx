import React, { useState, ReactNode } from "react";
import { InputDialogProps, InputField as InputFieldType } from "../types";

interface InputDialogComponentProps extends InputDialogProps {
  children?: ReactNode;
}

/**
 * InputDialog component for collecting user input
 * @param closable - If true, allows closing by clicking overlay (default: true)
 * @param blur - If true, applies blur effect to background (default: false)
 */
export function InputDialog({
  title,
  description,
  fields,
  confirmText = "Submit",
  cancelText = "Cancel",
  onSubmit,
  onCancel,
  closable = true,
  blur = false,
  children
}: InputDialogComponentProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    fields.forEach(field => {
      initial[field.name] = field.defaultValue ?? (field.type === 'checkbox' ? false : '');
    });
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: any, field: InputFieldType) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (field.onChange) {
      field.onChange(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const value = values[field.name];
      
      if (field.required && !value && value !== 0 && value !== false) {
        newErrors[field.name] = `${field.label || field.name} is required`;
      }
      
      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(values);
  };

  const renderField = (field: InputFieldType) => {
    const value = values[field.name];
    const error = errors[field.name];
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      style: {
        width: '100%',
        padding: '8px',
        border: `1px solid ${error ? '#f44336' : '#ddd'}`,
        borderRadius: '4px',
        fontSize: '14px'
      }
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value, field)}
            rows={4}
          />
        );
      
      case 'select':
        return (
          <select
            {...commonProps}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value, field)}
          >
            <option value="">Select...</option>
            {field.options?.map((opt) => {
              const isObject = typeof opt === 'object';
              const optValue = isObject ? opt.value : opt;
              const optLabel = isObject ? opt.label : opt;
              return (
                <option key={optValue} value={optValue}>
                  {optLabel}
                </option>
              );
            })}
          </select>
        );
      
      case 'checkbox':
        return (
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name={field.name}
              checked={value}
              onChange={(e) => handleChange(field.name, e.target.checked, field)}
              style={{ marginRight: '8px' }}
            />
            {field.label}
          </label>
        );
      
      default:
        return (
          <input
            {...commonProps}
            type={field.type || 'text'}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value, field)}
          />
        );
    }
  };

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
          minWidth: "400px",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 style={{ margin: "0 0 8px 0", fontSize: "20px" }}>
            {title}
          </h2>
        )}
        
        {description && (
          <p style={{ margin: "0 0 24px 0", color: "#666" }}>
            {description}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} style={{ marginBottom: "16px" }}>
              {field.type !== 'checkbox' && field.label && (
                <label 
                  htmlFor={field.name}
                  style={{ 
                    display: 'block', 
                    marginBottom: '4px', 
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {field.label}
                  {field.required && <span style={{ color: '#f44336' }}> *</span>}
                </label>
              )}
              
              {renderField(field)}
              
              {errors[field.name] && (
                <span style={{ 
                  display: 'block', 
                  marginTop: '4px', 
                  fontSize: '12px', 
                  color: '#f44336' 
                }}>
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}

          {children}

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px" }}>
            <button
              type="button"
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
              type="submit"
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
        </form>
      </div>
    </div>
  );
}
