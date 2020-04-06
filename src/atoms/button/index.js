import React from 'react';
import './styles.css';

function Button({ name, type, onClick, style, className }) {
  return (
    <button type={type} onClick={onClick} style={style} className={className} >{name}</button>
  );
}
export default Button;


