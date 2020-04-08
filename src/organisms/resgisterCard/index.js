import React from 'react';
import styled from 'styled-components';
import Logo from '../../atoms/logo';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import FormRegister from '../../molecules/formRegister'

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 40px;
  color: #41414d;
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;

  & > svg {
    margin-right: 8px;
  }
  
  &:hover{
      opacity: 0.8;

  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 30px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `;

const FixLogo = styled.div`
  margin: 30px 0 15px 0;
  `;

const LoginBtn = styled(FiArrowLeft)`
    color: #4caf50;
    size: 16px;
  `;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h1`
  font: 300 32px Roboto, sans-serif;
  margin-bottom: 16px;
`;





function ResgisterCard() {
  return (
    <LoginContainer>
      <FixLogo>
        <Logo />
      </FixLogo>
      <Text>Faça seu Cadastro</Text>
      <FormContainer>
        <FormRegister />
        <BackLink to='/login'>
          <LoginBtn />
          Já tenho cadastro
        </BackLink>
      </FormContainer>
    </LoginContainer>
  );
}
export default ResgisterCard;




