import React from 'react';
import './styles.css';

function Input({ placeholder, type, value, onChange, required }) {
  return (
    <input required={required} placeholder={placeholder} type={type} value={value} onChange={onChange} />
  );
}
export default Input;
