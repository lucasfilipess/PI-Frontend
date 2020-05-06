import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../atoms/button';
import {
  isNotEmpty,
  isNotEmpty2,
  isNotEmpty3,
  searchUf,
  searchCep,
} from '../../utils/formValidation';
import Input from '../../atoms/input';
import Textarea from '../../atoms/textarea';
import CheckboxInput from '../../atoms/checkbox';

import Toggle from '../accordion';

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

const StyledForm = styled.form`
  width: 100%;
  & > textarea {
    margin-top: 8px;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  margin: 8px 0;
  align-items: center;
  & > p {
    font: 400 16px Roboto, sans-serif;
    margin: 0;
  }
`;

const Endereco = styled.div`
  & > input + input {
    margin-top: 8px;
  }
`;

function FormDonation() {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const [register, setRegister] = useState({
    address: '',
    cep: '',
    complement: '',
    city: '',
    description: '',
    number: '',
    neighborhood: '',
    uf: '',
    title: '',
  });

  const [wrong, setWrong] = useState({
    address: '',
    cep: '',
    complement: '',
    city: '',
    description: '',
    number: '',
    neighborhood: '',
    uf: '',
    title: '',
  });
  const [modal, setModal] = useState({
    wrongField: false,
    succes: false,
  });
  const [isChecked, setIsChecked] = useState(1);

  async function handleRegister(e) {
    e.preventDefault();
    let data;
    console.log('CHECKED ->', isChecked);

    if (isChecked === 2) {
      console.log('Entrei 2');
      data = {
        cep: register.cep,
        city: register.city,
        address: register.address,
        neighborhood: register.neighborhood,
        uf: register.uf,
        number: register.number,
        complement: register.complement,
        title: register.title,
        description: register.description,
        checked: 2,
      };
      setWrong((e) => ({ ...e, cep: isNotEmpty(data.cep) }));
      setWrong((e) => ({ ...e, city: isNotEmpty(data.city) }));
      setWrong((e) => ({ ...e, address: isNotEmpty(data.address) }));
      setWrong((e) => ({ ...e, neighborhood: isNotEmpty(data.neighborhood) }));
      setWrong((e) => ({ ...e, uf: isNotEmpty2(data.uf) }));
      setWrong((e) => ({ ...e, number: isNotEmpty3(data.number) }));
      setWrong((e) => ({ ...e, title: isNotEmpty3(data.title) }));
      setWrong((e) => ({ ...e, description: isNotEmpty3(data.description) }));
    } else {
      console.log('Entrei 1');

      data = {
        title: register.title,
        description: register.description,
        checked: 1,
      };

      console.log('WRONG TITLE ->', isNotEmpty3(data.title));
      console.log('WRONG DESCRIPTION ->', isNotEmpty3(data.description));

      setWrong((e) => ({ ...e, title: isNotEmpty3(data.title) }));
      setWrong((e) => ({ ...e, description: isNotEmpty3(data.description) }));

      setWrong((e) => ({ ...e, cep: false }));
      setWrong((e) => ({ ...e, city: false }));
      setWrong((e) => ({ ...e, address: false }));
      setWrong((e) => ({ ...e, neighborhood: false }));
      setWrong((e) => ({ ...e, uf: false }));
      setWrong((e) => ({ ...e, number: false }));
    }

    if (
      !wrong.address &&
      !wrong.cep &&
      !wrong.city &&
      !wrong.description &&
      !wrong.neighborhood &&
      !wrong.uf &&
      !wrong.title &&
      !wrong.number &&
      (register.title.length && register.description.length) >= 5
    ) {
      console.log('DATA AQUI ->', data);
      await api
        .post('donations', data, {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          console.log(response.status);
          setModal({ ...modal, succes: true });
        })
        .catch((error) => {
          console.log(
            'Server error: ',
            error.response.status,
            error.response.data.error
          );
        });
    } else {
      setModal({ ...modal, wrongField: true });
    }
  }

  function handleSucces() {
    setModal({ ...modal, succes: false });
    history.push('/dashboard');
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
        console.log('Erro');
        setWrong({ ...wrong, cep: true });
      }
    });
  }

  return (
    <StyledForm onSubmit={handleRegister}>
      <Input
        onChange={(e) => {
          setRegister({ ...register, title: e.target.value });
          setWrong({ ...wrong, title: isNotEmpty2(e.target.value) });
        }}
        placeholder="Título"
        style={wrong.title ? red : pattern}
        title="Seu nome"
        type="text"
        value={register.title}
      />

      <Textarea
        onChange={(e) => {
          setRegister({ ...register, description: e.target.value });
          setWrong({ ...wrong, description: isNotEmpty2(e.target.value) });
        }}
        style={wrong.description ? red : pattern}
        placeholder="Descrição"
        title="Uma descrição sobre a doação"
        type="text"
        value={register.description}
      />

      <CheckboxGroup>
        <CheckboxInput
          checked={isChecked === 1}
          onClick={() => setIsChecked(1)}
        />
        <p>Usar meu endereço cadastrado</p>
      </CheckboxGroup>
      <Toggle
        checked={isChecked === 2}
        onClick={() => setIsChecked(2)}
        text="Adicionar um novo endereço"
        content={
          <>
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

            <Endereco>
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
                  setWrong({
                    ...wrong,
                    neighborhood: isNotEmpty(e.target.value),
                  });
                }}
                placeholder="Bairro"
                style={wrong.neighborhood ? red : pattern}
                title="Bairro onde reside"
                type="text"
                value={register.neighborhood}
              />
            </Endereco>

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
          </>
        }
      />
      <Button type="submit" name="Cadastrar" style={{ marginTop: 16 }} />
      <SuccesModal
        text="Cadastro realizado com sucesso"
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
    </StyledForm>
  );
}
export default FormDonation;
