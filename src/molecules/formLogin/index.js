import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Input from '../../atoms/input';
import Button from '../../atoms/button';

const StyledForm = styled.form`
  width: 100%;
  max-width: 350px;
  & > Input + Input {
    margin-top: 8px;
  }

  & > Input + Button{
    margin-top: 16px;
  }
`;

function FormLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    const data = ({
      email,
      password
    });

    try {
      const response = await api.post('login', data);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('type', response.data.type);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('token', response.data.token);

      if (response.data.type === 'company') {
        history.push('company');
      };

      if (response.data.type === 'donor') {
        history.push('donor');
      }


    } catch (error) {
      alert('Falha no Login');
    }

  };

  return (
    <StyledForm onSubmit={handleLogin}>
      <Input
        required="required"
        placeholder='Email'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)} />
      <Input
        required="required"
        placeholder='Senha'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)} />
      <Button type='submit' name='Login' /* style={{ marginTop: 16 }} */ />
    </StyledForm>

  );
}
export default FormLogin;