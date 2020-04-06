import React, { useState } from 'react';
import Input from '../../atoms/input';
import Button from '../../atoms/button';
import api from '../../services/api';
import './styles.css';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';
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
  const [type, setType] = useState('null');
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


  return (
    <form onSubmit={handleRegister}>
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
      <div className='group'>
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
      </div>
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

      <div className='buttons'>
        <Button
          required="required"
          type='button'
          onClick={() => setType('donor')}
          className={type === 'donor' ? styles.active : styles.disabled}
          name='Doar'
        />
        <Button
          required="required"
          type='button'
          onClick={() => setType('company')}
          className={type === 'company' ? styles.active : styles.disabled}
          name='Receber'
        />
      </div>


      <Button type='submit' name='Cadastrar' style={{ marginTop: 16 }} />
    </form>



  );
}
export default FormRegister;




