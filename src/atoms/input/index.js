import React from 'react';
import styled from 'styled-components';


const StyledInput = styled.input`
  border: 1px solid #dcdce6;
  border-radius: 8px;
  color: #3333;
  font: 400 18px Roboto, sans-serif;
  height: 60px;
  padding: 0 24px;
  width: 100%;
`;

function Input({ placeholder, type, value, onChange, required }) {
  return (
    <StyledInput required={required} placeholder={placeholder} type={type} value={value} onChange={onChange} />
  );
}
export default Input;
