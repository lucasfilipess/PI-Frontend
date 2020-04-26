import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../atoms/button';
import {
  checkEmail,
  checkWhatapp,
  isNotEmpty,
  isNotEmpty2,
  isNotEmpty3,
  searchUf,
  searchCep,
  unformat,
} from '../../utils/formValidation';
import Fade from '@material-ui/core/Fade';
import Input from '../../atoms/input';
import Modal from '@material-ui/core/Modal';
import Textarea from '../../atoms/textarea';
import { FiEye } from 'react-icons/fi';

import SuccesModal, { ErrorModal } from '../modals';

const Group = styled.div`
  align-items: center;
  display: flex;
  & > Input {
    margin: 8px 0;
  }
  & > Input + Input {
    margin-left: 8px;
    max-width: 80px;
  }
`;

const pattern = {
  borderColor: '#dcdce6',
};

const red = {
  borderColor: '#f44336',
};

const StyledButton = styled(Button)`
  background: transparent;
  color: #41414d;
  font: 400 18px Roboto, sans-serif;
  transition: color 0.2s;
  &:hover {
    color: #4caf50;
    filter: brightness(100%);
  }
`;

const HouseComplement = styled.div`
  align-items: center;
  display: flex;
  & > Input {
    margin: 8px 0 0 0;
    max-width: 120px;
  }
  & > Input + Input {
    margin-left: 8px;
    max-width: 100%;
  }
`;
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
  margin: 8px 0;
`;

const StyledForm = styled.form`
  width: 100%;
  & > Input + Input {
    margin-top: 8px;
  }
  & > Input + Textarea {
    margin-top: 8px;
  }
  & > Textarea + Input {
    margin-top: 8px;
  }
`;

function FormDonation() {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const [register, setRegister] = useState({
    address: '',
    cep: '',
    checkPassword: '',
    complement: '',
    city: '',
    description: '',
    email: '',
    number: '',
    neighborhood: '',
    password: '',
    uf: '',
    title: '',
    whatsapp: '',
  });

  const [eye, setEye] = useState(false);
  const [wrong, setWrong] = useState({
    address: '',
    cep: '',
    checkPassword: '',
    complement: '',
    city: '',
    description: '',
    email: '',
    number: '',
    neighborhood: '',
    password: '',
    uf: '',
    title: '',
    whatsapp: '',
  });
  const [modal, setModal] = useState({
    wrongField: false,
    succes: false,
    emailExists: false,
  });

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name: register.name,
      email: register.email,
      whatsapp: register.whatsapp,
      password: register.password,
      cep: register.cep,
      city: register.city,
      address: register.address,
      neighborhood: register.neighborhood,
      uf: register.uf,
      number: register.number,
      complement: register.complement,
      title: register.title,
      description: register.description,
    };

    if (
      !wrong.address &&
      !wrong.cep &&
      !wrong.city &&
      !wrong.description &&
      !wrong.email &&
      !wrong.neighborhood &&
      !wrong.password &&
      !wrong.uf &&
      !wrong.whatsapp &&
      !wrong.title &&
      !wrong.number &&
      (register.title &&
        register.email &&
        register.description &&
        register.whatsapp &&
        register.cep &&
        register.city &&
        register.uf &&
        register.address &&
        register.neighborhood &&
        register.complement &&
        register.password) !== ''
    ) {
      await api
        .post('donations', data, {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          console.log(response.status);
          // handleOpenModalCreate();
        })
        .catch((error) => {
          console.log(
            'Server error: ',
            error.response.status,
            error.response.data.error
          );
        });
    } else {
      // handleOpenModalError();
    }
  }

  // async function useRegisteredAddress(e) {
  //   await api
  //     .get('donation/address', {
  //       headers: {
  //         authorization: token,
  //       },
  //     })
  //     .then((response) => {
  //       const [loc] = response.data;
  //       setCep(loc.cep);
  //       setCity(loc.city);
  //       setUf(loc.uf);
  //       setAddress(loc.address);
  //       setNeighborhood(loc.neighborhood);
  //       setWrongAddress(false);
  //       setWrongCep(false);
  //       setWrongCity(false);
  //       setWrongNeighborhood(false);
  //       setWrongUf(false);
  //     })
  //     .catch((error) => console.log(error));
  // }

  function handleSearchCep(callCep) {
    searchCep(callCep).then((response) => {
      if (response) {
        setWrong((e) => ({ ...e, cep: false }));
        setWrong((e) => ({ ...e, city: false }));
        setWrong((e) => ({ ...e, uf: false }));
        setWrong((e) => ({ ...e, address: false }));
        setWrong((e) => ({ ...e, neighborhood: false }));
        setWrong((e) => ({ ...e, number: false }));
        setWrong((e) => ({ ...e, complement: false }));
        setRegister((e) => ({ ...e, city: response.city }));
        setRegister((e) => ({ ...e, uf: response.uf }));
        setRegister((e) => ({ ...e, address: response.address }));
        setRegister((e) => ({
          ...e,
          neighborhood: response.neighborhood,
        }));
        setRegister((e) => ({ ...e, number: response.number }));
        setRegister((e) => ({
          ...e,
          complement: response.complement,
        }));
      } else {
        console.log('Erro');
        setWrong({ ...wrong, cep: true });
      }
    });
  }

  return (
    <StyledForm onSubmit={handleRegister}>
      <Input
        onChange={(e) => setRegister({ ...register, title: e.target.value })}
        placeholder="Título"
        style={wrong.title ? red : pattern}
        title="Seu nome"
        type="text"
        value={register.title}
      />

      <Textarea
        onChange={(e) =>
          setRegister({ ...register, description: e.target.value })
        }
        style={wrong.description ? red : pattern}
        placeholder="Descrição"
        title="Uma descrição sobre a doação"
        type="text"
        value={register.description}
      />

      {/* <StyledButton
        onClick={useRegisteredAddress}
        name="Usar endereço cadastrado"
        type="button"
      /> */}

      <Input
        onChange={(e) => {
          setRegister({ ...register, email: e.target.value });
          setWrong({ ...wrong, email: checkEmail(e.target.value) });
        }}
        placeholder="Email"
        style={wrong.email ? red : pattern}
        title="Seu email para contato e login"
        value={register.email}
      />
      <Input
        alwaysShowMask={false}
        maskPlaceholder={null}
        mask={'99 9 9999-9999'}
        onChange={(e) => {
          setRegister({ ...register, whatsapp: unformat(e.target.value) });
          setWrong({ ...wrong, whatsapp: checkWhatapp(e.target.value) });
        }}
        placeholder="Whatsapp"
        style={wrong.whatsapp ? red : pattern}
        title="Seu contato via Whatsapp"
        type="text"
        value={register.whatsapp}
      />

      <Input
        mask="99999-999"
        maskPlaceholder={null}
        onChange={(e) => {
          setRegister({ ...register, cep: e.target.value });
          if (e.target.value.length === 9) {
            handleSearchCep(e.target.value);
          }
        }}
        placeholder="CEP"
        style={wrong.cep ? red : pattern}
        title="Seu CEP"
        type="text"
        value={register.cep}
      />

      <Group>
        <Input
          onChange={(e) => {
            setRegister({ ...register, city: e.target.value });
            setWrong({ ...wrong, city: isNotEmpty(e.target.value) });
          }}
          placeholder="Cidade"
          style={wrong.city ? red : pattern}
          title="Cidade onde reside"
          type="text"
          value={register.city}
        />
        <Input
          maxLength="2"
          onChange={(e) => {
            setRegister({ ...register, uf: e.target.value });
            setWrong({ ...wrong, uf: searchUf(e.target.value) });
          }}
          placeholder="UF"
          style={wrong.uf ? red : pattern}
          title="O estado onde reside"
          type="text"
          value={register.uf}
        />
      </Group>

      <Input
        onChange={(e) => {
          setRegister({ ...register, address: e.target.value });
          setWrong({ ...wrong, address: isNotEmpty(e.target.value) });
        }}
        placeholder="Endereço"
        style={wrong.address ? red : pattern}
        title="Endereço onde reside"
        type="text"
        value={register.address}
      />
      <Input
        onChange={(e) => {
          setRegister({ ...register, neighborhood: e.target.value });
          setWrong({ ...wrong, neighborhood: isNotEmpty(e.target.value) });
        }}
        placeholder="Bairro"
        style={wrong.neighborhood ? red : pattern}
        title="Bairro onde reside"
        type="text"
        value={register.neighborhood}
      />

      <HouseComplement>
        <Input
          onChange={(e) => {
            setRegister({ ...register, number: e.target.value });
            setWrong({ ...wrong, number: isNotEmpty3(e.target.value) });
          }}
          placeholder="Número"
          style={wrong.number ? red : pattern}
          title="Número da casa ou apartamento"
          type="number"
          value={register.number}
        />
        <Input
          onChange={(e) =>
            setRegister({ ...register, complement: e.target.value })
          }
          placeholder="Complemento"
          style={wrong.complement ? red : pattern}
          title="Ex: Apartamento A"
          type="text"
          value={register.complement}
        />
      </HouseComplement>

      <PasswordGroup>
        <Input
          onChange={(e) => {
            setWrong({ ...wrong, password: false });
            setRegister({ ...register, password: e.target.value });
            if (e.target.value === register.checkPassword) {
              setWrong({ ...wrong, password: false });
            }
          }}
          placeholder="Senha"
          style={wrong.password ? red : pattern}
          title="Sua senha para login"
          type={eye ? 'text' : 'password'}
          value={register.password}
        />
        <Eye
          onMouseDown={(e) => setEye(true)}
          onMouseUp={(e) => setEye(false)}
        />
      </PasswordGroup>

      <Input
        onChange={(e) => {
          setRegister({ ...register, checkPassword: e.target.value });
          if (e.target.value === register.password) {
            setWrong({ ...wrong, checkPassword: false });
          } else {
            setWrong({ ...wrong, checkPassword: true });
          }
        }}
        placeholder="Confirmar senha"
        style={wrong.checkPassword ? red : pattern}
        title="Digite a mesma senha digitada acima"
        type={eye ? 'text' : 'password'}
        value={register.checkPassword}
      />

      <Button type="submit" name="Cadastrar" style={{ marginTop: 16 }} />
    </StyledForm>
  );
}
export default FormDonation;
