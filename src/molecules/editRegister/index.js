import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
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
import { FiEye } from 'react-icons/fi';
import Input from '../../atoms/input';

import SuccesModal, { ErrorModal } from '../modals';

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

const PasswordGroup = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  margin: 8px 0;
`;

const red = {
  borderColor: '#f44336',
};

const StyledForm = styled.form`
  width: 100%;
  & > Input + Input {
    margin-top: 8px;
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

function EditRegister() {
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function getUser() {
      await api
        .get('user', {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => setData(response.data));
    }
    getUser();
  }, [token]);
  const history = useHistory();

  function setData(data) {
    setRegister((e) => ({ ...e, name: data.name }));
    setRegister((e) => ({ ...e, email: data.email }));
    setRegister((e) => ({ ...e, whatsapp: data.whatsapp }));
    setRegister((e) => ({ ...e, password: data.password }));
    setRegister((e) => ({ ...e, cep: data.cep }));
    setRegister((e) => ({ ...e, city: data.city }));
    setRegister((e) => ({ ...e, address: data.address }));
    setRegister((e) => ({ ...e, neighborhood: data.neighborhood }));
    setRegister((e) => ({ ...e, uf: data.uf }));
    setRegister((e) => ({ ...e, number: data.number }));
    setRegister((e) => ({ ...e, complement: data.complement }));
  }

  const [register, setRegister] = useState({
    address: '',
    cep: '',
    checkPassword: '',
    complement: '',
    city: '',
    email: '',
    name: '',
    number: '',
    neighborhood: '',
    password: '',
    uf: '',
    whatsapp: '',
  });

  const [eye, setEye] = useState(false);
  const [wrong, setWrong] = useState({
    address: '',
    cep: '',
    checkPassword: '',
    complement: '',
    city: '',
    email: '',
    name: '',
    number: '',
    neighborhood: '',
    password: '',
    uf: '',
    whatsapp: '',
  });

  const [modal, setModal] = useState({
    wrongField: false,
    succes: false,
    emailExists: false,
  });

  async function handleEdit(e) {
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
      complement: register.complement ? register.complement : 'não possuo',
    };

    setWrong((e) => ({ ...e, name: isNotEmpty2(data.name) }));
    setWrong((e) => ({ ...e, email: isNotEmpty(data.email) }));
    setWrong((e) => ({ ...e, whatsapp: isNotEmpty(data.whatsapp) }));
    setWrong((e) => ({ ...e, password: isNotEmpty3(data.password) }));
    setWrong((e) => ({ ...e, cep: isNotEmpty(data.cep) }));
    setWrong((e) => ({ ...e, city: isNotEmpty(data.city) }));
    setWrong((e) => ({ ...e, address: isNotEmpty(data.address) }));
    setWrong((e) => ({ ...e, neighborhood: isNotEmpty(data.neighborhood) }));
    setWrong((e) => ({ ...e, uf: isNotEmpty2(data.uf) }));
    setWrong((e) => ({ ...e, number: isNotEmpty3(data.number) }));

    if (
      !wrong.address &&
      !wrong.cep &&
      !wrong.city &&
      !wrong.email &&
      !wrong.name &&
      !wrong.neighborhood &&
      !wrong.password &&
      !wrong.uf &&
      !wrong.whatsapp &&
      !wrong.number &&
      (register.name &&
        register.email &&
        register.whatsapp &&
        register.cep &&
        register.city &&
        register.uf &&
        register.address &&
        register.neighborhood &&
        register.password) !== ''
    ) {
      await api
        .put('register', data, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          localStorage.setItem('name', data.name);
          setModal({ ...modal, succes: true });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setWrong({ ...wrong, email: true });
          } else {
            console.log('internal server error: ', error.response.status);
          }
        });
    } else {
      setModal({ ...modal, wrongField: true });
    }
  }

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
        setWrong({ ...wrong, cep: true });
      }
    });
  }

  function handleSucces() {
    setModal({ ...modal, succes: false });
    history.push('/profile');
  }

  return (
    <div>
      <StyledForm onSubmit={handleEdit}>
        <Input
          onChange={(e) => {
            setRegister({ ...register, name: e.target.value });
            setWrong({ ...wrong, name: isNotEmpty2(e.target.value) });
          }}
          placeholder="Nome"
          style={wrong.name ? red : pattern}
          title="Seu nome"
          type="text"
          value={register.name}
        />
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
        <Button type="submit" name="Salvar" style={{ marginTop: 16 }} />
      </StyledForm>
      <SuccesModal
        text="Cadastro atualizado com sucesso"
        open={modal.succes}
        close={() => handleSucces()}
        fadein={modal.succes}
      />
      <ErrorModal
        text="Verifique se todos os campos estão preenchidos corretamente"
        open={modal.wrongField}
        close={() => setModal({ ...modal, wrongField: false })}
        fadein={modal.wrongField}
      />
    </div>
  );
}
export default EditRegister;
