import React from 'react';
import styled from 'styled-components';
import { FiLogIn } from 'react-icons/fi';
import FormLogin from '../../molecules/formLogin';
import Logo from '../../atoms/logo';
import { Link } from 'react-router-dom';

const BackLink = styled(Link)`
  &&& {
    align-items: center;
    color: #41414d;
    display: flex;
    font-size: 18px;
    font-weight: 500;
    justify-content: center;
    margin-top: 40px;
    text-decoration: none;
    transition: opacity 0.2s;
    & > svg {
      margin-right: 8px;
    }
    &:hover {
      opacity: 0.8;
    }
  }
`;

const FixLogo = styled.div`
  margin: 30px 0 15px 0;
`;

const RegisterBtn = styled(FiLogIn)`
  color: #4caf50;
  size: 16px;
`;

const Text = styled.h1`
  font: 300 32px Roboto, sans-serif;
  margin-bottom: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormCard = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 320px;
  padding: 30px 20px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

function LoginCard() {
  return (
    <div>
      <Container>
        <FixLogo>
          <Logo />
        </FixLogo>
        <Text>Faça seu Login</Text>
        <FormCard>
          <FormLogin />
          <BackLink to="/register">
            <RegisterBtn />
            Não tenho cadastro
          </BackLink>
        </FormCard>
      </Container>
    </div>
  );
}
export default LoginCard;
