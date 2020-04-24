import React from 'react';
import styled from 'styled-components';
import fertilizerImg from '../../assets/fertilizer.svg';

const StyledImg = styled.img`
  height: auto;
  width: 60px;
`;

function FertilizerImg() {
  return <StyledImg src={fertilizerImg} alt="Fertilizer Img" />;
}
export default FertilizerImg;
