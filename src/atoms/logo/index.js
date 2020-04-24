import React from 'react';
import styled from 'styled-components';
import logoImg from '../../assets/logo.svg';

const StyledImg = styled.img`
  height: 130px;
  width: 130px;
`;

function Logo() {
  return <StyledImg src={logoImg} alt="Logo" />;
}
export default Logo;
