import React from 'react';

const baseInputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #EBEBEB',
  borderRadius: '6px',
  fontSize: '0.95rem',
  marginBottom: '16px',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
  backgroundColor: '#fff',
};

export const Input = ({ style, ...props }) => {
  return (
    <input 
      style={{ ...baseInputStyle, ...style }} 
      {...props} 
    />
  );
};

export const TextArea = ({ style, ...props }) => {
  return (
    <textarea 
      style={{ ...baseInputStyle, minHeight: '100px', resize: 'vertical', ...style }} 
      {...props} 
    />
  );
};

export const Select = ({ style, ...props }) => {
  return (
    <select 
      style={{
        ...baseInputStyle,
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        backgroundSize: '16px',
        ...style
      }} 
      {...props} 
    />
  );
};

export const Label = ({ children, style, ...props }) => {
  return (
    <label 
      style={{
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#555',
        marginBottom: '6px',
        ...style
      }} 
      {...props}
    >
      {children}
    </label>
  );
};

export const SectionTitle = ({ children, style, ...props }) => {
  return (
    <h3 
      style={{
        fontSize: '1rem',
        fontWeight: 'bold',
        margin: '24px 0 16px 0',
        borderBottom: '2px solid #222',
        paddingBottom: '8px',
        ...style
      }}
      {...props}
    >
      {children}
    </h3>
  );
};

export const FormGroup = ({ label, children }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      {children}
    </div>
  );
};
