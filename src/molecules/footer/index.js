import React from 'react';
import styled from 'styled-components';
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillGithub,
  AiFillMail,
} from 'react-icons/ai';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #424242;
  border-top: 2px solid #4caf50;
  height: 250px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
`;

const CopyRight = styled.div`
  max-width: 500px;
  display: flex;
  align-items: center;
  color: #4caf50;
  font-size: 16px;
  font-weight: bold;
  margin-top: 60px;
`;
const Social = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: auto 10px 10px 0;
  & > svg {
    color: #212121;
    margin-right: 10px;
    transition: color 0.2s;
    &:hover {
      color: #fff;
    }
  }
`;

function Footer({ style }) {
  return (
    <>
      <Container style={style}>
        <CopyRight>
          Sistema em desenvolvimento. Software pensado na tentativa de sanar os
          impactos do 12° problema dos Objetivos de desenvolvimento sustentável
          da ONU. <br />
          ©2020 Todos os direitos reservados.
        </CopyRight>

        <Social>
          <AiFillInstagram size={26} />
          <AiFillLinkedin size={26} />
          <AiFillGithub size={26} />
          <AiFillMail size={26} />
        </Social>
      </Container>
    </>
  );
}

export default Footer;
