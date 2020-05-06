import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const StyledInput = styled(InputMask)`
  border: 1px solid #dcdce6;
  border-radius: 8px;
  font: 400 18px Roboto, sans-serif;
  height: 55px;
  padding: 0 24px;
  width: 100%;
`;

function Input({
  placeholder,
  type,
  value,
  onChange,
  required,
  onBlur,
  style,
  maxLength,
  minLength,
  mask,
  title,
  maskPlaceholder,
}) {
  return (
    <StyledInput
      style={style}
      onBlur={onBlur}
      required={required}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      minLength={minLength}
      mask={mask}
      title={title}
      maskPlaceholder={maskPlaceholder}
    />
  );
}
export default Input;
