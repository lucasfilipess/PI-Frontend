import React from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  border: 1px solid #dcdce6;
  border-radius: 8px;
  color: 3333;
  line-height: 24px;
  min-height: 140px;
  padding: 16px 24px;
  resize: vertical;
  width: 100%;
`;

function Textarea({ placeholder, type, value, onChange, required, onBlur, style, maxLength, minLengt, title }) {
  return (
    <StyledTextarea
      maxLength={maxLength}
      minLengt={minLengt}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={style}
      title={title}
      type={type}
      value={value}
    />
  );
}
export default Textarea;