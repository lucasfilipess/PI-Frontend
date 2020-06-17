import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api';
import Button from '../../atoms/button';
import { checkEmail } from '../../utils/formValidation';
import { FiEye } from 'react-icons/fi';
import Input from '../../atoms/input';
import { ErrorModal } from '../modals';

const Eye = styled(FiEye)`
  background: #fff;
  color: #41414d;
  height: 37px;
  position: absolute;
  left: 80%;
  margin: 0 10px;
  padding: 0 8px;
  transition: color 0.2s;
  width: 37px;
  &:hover {
    color: #4caf50;
  }
`;

const PasswordGroup = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

const pattern = {
  borderColor: '#dcdce6',
};

const red = {
  borderColor: '#f44336',
};

const StyledForm = styled.form`
  width: 100%;
  & > Input + div {
    margin-top: 8px;
  }

  & > div + Button {
    margin-top: 16px;
  }
`;

function FormLogin() {
  const [eye, setEye] = useState(false);

  const history = useHistory();

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [openModal, setOpenModal] = useState(false);

  const [wrongEmail, setWrongEmail] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    const data = {
      email: login.email,
      password: login.password,
    };

    if (!wrongEmail && login.email !== '' && login.password !== '') {
      await api
        .post('login', data)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', response.data.name);
          history.push('dashboard');
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setOpenModal(true);
          } else {
            console.log('internal server error');
          }
        });
    } else {
      setOpenModal(true);
    }
  }
  return (
    <>
      <StyledForm onSubmit={handleLogin}>
        <Input
          onBlur={(e) => setWrongEmail(checkEmail(e.target.value))}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          placeholder="Email"
          style={wrongEmail ? red : pattern}
          title="Sua email para login"
          value={login.email}
        />

        <PasswordGroup>
          <Input
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            placeholder="Senha"
            title="Sua senha para login"
            type={eye ? 'text' : 'password'}
            value={login.password}
          />
          <Eye
            onMouseDown={() => setEye(true)}
            onMouseUp={() => setEye(false)}
          />
        </PasswordGroup>
        <Button type="submit" name="Login" />
      </StyledForm>
      <ErrorModal
        text="Senha ou email inválidos"
        open={openModal}
        close={() => setOpenModal(false)}
        fadein={openModal}
      />
    </>
  );
}
export default FormLogin;
