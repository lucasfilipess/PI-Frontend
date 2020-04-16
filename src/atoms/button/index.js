import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: #4caf50;
  border: 0;
  border-radius: 8px;
  color: #fff;
  font: 400 18px Roboto, sans-serif;
  font-weight: bold;
  height: 55px;
  line-height: 55px;
  text-align: center;
  text-decoration: none;
  transition: filter 0.2s;
  width: 100%;
  &:hover {
    filter: brightness(90%);
  }
`;

function Button({ name, type, onClick, style, className }) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      style={style}
      className={className}
    >
      {name}
    </StyledButton>
  );
}
export default Button;
