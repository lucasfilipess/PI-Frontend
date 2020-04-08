import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);



const StyledForm = styled.form`
  width: 100%;
  & > Input + Input{
    margin-top: 8px;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  & > Input {
    margin: 8px 0;
  }
  &> Input + Input{
    max-width: 80px;
    margin-left: 8px;
  }
`;

const CheckBoxGroup = styled.div`
  align-items: center;
  display: flex;
  justify-content:space-around;
  margin-top:8px;
  & > div {
    align-items: center;
    display:flex;
    justify-content: center;
    max-width: 40%;
  } 
  & > div > p {
    color: #333;
    font-size: 14px;
    font: 500 14px Roboto, sans-serif;

  }
`;


function FormRegister() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [description, setDescription] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');


  const history = useHistory();
  async function handleRegister(e) {
    e.preventDefault();
    const data = ({
      type,
      name,
      email,
      whatsapp,
      password,
      description,
      cep,
      city,
      address,
      neighborhood,
      uf,
    });

    console.log(data);


    try {
      const response = await api.post('register', data);
      console.log(response.data);
      history.push('login');
    } catch (error) {
      console.log(error);

    }
  };

  console.log(type);


  return (
    <StyledForm onSubmit={handleRegister}>
      <Input
        required="required"
        placeholder='Nome'
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input
        required="required"
        placeholder='Email'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        required="required"
        placeholder='Whatsapp'
        type='text'
        value={whatsapp}
        onChange={e => setWhatsapp(e.target.value)}
      />
      <Input
        required="required"
        placeholder='Descrição'
        type='text'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Input
        required="required"
        placeholder='CEP'
        type='text'
        value={cep}
        onChange={e => setCep(e.target.value)}
      />

      <Group>
        <Input
          required="required"
          placeholder='Cidade'
          type='text'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <Input
          required="required"
          placeholder='UF'
          type='text'
          value={uf}
          onChange={e => setUf(e.target.value)}
        />
      </Group>


      <Input
        required="required"
        placeholder='Endereço'
        type='text'
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <Input
        required="required"
        placeholder='Bairro'
        type='text'
        value={neighborhood}
        onChange={e => setNeighborhood(e.target.value)}
      />


      <Input
        required="required"
        placeholder='Senha'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <CheckBoxGroup>

        <div>
          <GreenCheckbox
            onChange={() => setType('donor')}
            checked={type === 'donor' ? true : false}
            required={type === '' ? 'required' : ''}
          />
          <p>Quero fazer doações.</p>
        </div>

        <div>
          <GreenCheckbox
            onChange={() => setType('company')}
            checked={type === 'company' ? true : false}
            required={type === '' ? 'required' : ''}
          />
          <p>Quero receber doações.</p>
        </div>

      </CheckBoxGroup>


      <Button type='submit' name='Cadastrar' style={{ marginTop: 16 }} />
    </StyledForm>



  );
}
export default FormRegister;



