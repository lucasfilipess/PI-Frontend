import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '../../atoms/button';
import {
  checkName,
  checkEmail,
  checkWhatapp,
  checkCity,
  checkAddres,
  checkNeighborhood,
  searchUf,
  searchCep,
  unformat,
} from '../../utils/formValidation';
import Fade from '@material-ui/core/Fade';
import { FiEye, FiXOctagon, FiCheckCircle } from 'react-icons/fi';
import Input from '../../atoms/input';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const CheckCircle = styled(FiCheckCircle)`
  color: #4caf50;
  height: 60px;
  margin-right: 20px;
  width: 60px;
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

const Octagon = styled(FiXOctagon)`
  color: #f44336;
  height: 100px;
  margin-right: 20px;
  width: 100px;
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

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    borderRadius: 10,
    boxShadow: theme.shadows[1],
    display: 'flex',
    height: 200,
    justifyContent: 'center',
    padding: theme.spacing(2, 4, 2),
    width: 500,
  },
}));

function FormRegister() {
  const classes = useStyles();

  const history = useHistory();

  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [password, setPassword] = useState('');
  const [uf, setUf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [checkPassword, setCheckPassword] = useState('');
  const [eye, setEye] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEmail, setModalEmail] = useState(false);
  const [modalError, setModalError] = useState(false);

  const [wrongAddress, setWrongAddress] = useState(false);
  const [wrongCep, setWrongCep] = useState(false);
  const [wrongCity, setWrongCity] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongName, setWrongName] = useState(false);
  const [wrongNeighborhood, setWrongNeighborhood] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongUf, setWrongUf] = useState(false);
  const [wrongWhatsapp, setWrongWhatsapp] = useState(false);

  const handleCloseModalCreate = () => {
    setModalCreate(false);
    history.push('login');
  };

  const handleCloseModalEmail = () => {
    setModalEmail(false);
  };

  const handleCloseModalError = () => {
    setModalError(false);
  };

  const handleOpenModalCreate = () => {
    setModalCreate(true);
  };

  const handleOpenModalEmail = () => {
    setModalEmail(true);
  };

  const handleOpenModalError = () => {
    setModalError(true);
  };

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      password,
      cep,
      city,
      address,
      neighborhood,
      uf,
    };

    if (
      !wrongAddress &&
      !wrongCep &&
      !wrongCity &&
      !wrongEmail &&
      !wrongName &&
      !wrongNeighborhood &&
      !wrongPassword &&
      !wrongUf &&
      !wrongWhatsapp &&
      (name &&
        email &&
        whatsapp &&
        cep &&
        city &&
        uf &&
        address &&
        neighborhood &&
        password) !== ''
    ) {
      await api
        .post('register', data)
        .then((response) => {
          console.log(response);
          handleOpenModalCreate();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            handleOpenModalEmail();
          } else {
            console.log('internal server error: ', error.response.status);
          }
        });
    } else {
      handleOpenModalError();
    }
  }

  return (
    <div>
      <StyledForm onSubmit={handleRegister}>
        <Input
          onBlur={(e) => setWrongName(checkName(e.target.value))}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          style={wrongName ? red : pattern}
          title="Seu nome"
          type="text"
          value={name}
        />
        <Input
          onBlur={(e) => setWrongEmail(checkEmail(e.target.value))}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={wrongEmail ? red : pattern}
          title="Seu email para contato e login"
          value={email}
        />
        <Input
          alwaysShowMask={false}
          maskPlaceholder={null}
          mask="(99) 9 9999-9999"
          onBlur={(e) => setWrongWhatsapp(checkWhatapp(e.target.value))}
          onChange={(e) => setWhatsapp(unformat(e.target.value))}
          placeholder="Whatsapp"
          style={wrongWhatsapp ? red : pattern}
          title="Seu contato via Whatsapp"
          type="text"
          value={whatsapp}
        />

        <Input
          mask="99999-999"
          onBlur={(e) => {
            searchCep(e.target.value).then((response) => {
              if (response) {
                setCity(response.city);
                setUf(response.uf);
                setAddress(response.address);
                setNeighborhood(response.neighborhood);
                setWrongCep(false);
                setWrongAddress(false);
                setWrongCity(false);
                setWrongNeighborhood(false);
                setWrongUf(false);
              } else {
                setWrongCep(true);
              }
            });
          }}
          onChange={(e) => setCep(e.target.value)}
          placeholder="CEP"
          style={wrongCep ? red : pattern}
          title="Seu CEP"
          type="text"
          value={cep}
        />
        <Group>
          <Input
            onBlur={(e) => setWrongCity(checkCity(e.target.value))}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Cidade"
            style={wrongCity ? red : pattern}
            title="Cidade onde reside"
            type="text"
            value={city}
          />
          <Input
            maxLength="2"
            onBlur={(e) => setWrongUf(searchUf(e.target.value))}
            onChange={(e) => setUf(e.target.value)}
            placeholder="UF"
            style={wrongUf ? red : pattern}
            title="O estado onde reside"
            type="text"
            value={uf}
          />
        </Group>

        <Input
          onBlur={(e) => setWrongAddress(checkAddres(e.target.value))}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Endereço"
          style={wrongAddress ? red : pattern}
          title="Endereço onde reside"
          type="text"
          value={address}
        />
        <Input
          onBlur={(e) =>
            setWrongNeighborhood(checkNeighborhood(e.target.value))
          }
          onChange={(e) => setNeighborhood(e.target.value)}
          placeholder="Bairro"
          style={wrongNeighborhood ? red : pattern}
          title="Bairro onde reside"
          type="text"
          value={neighborhood}
        />

        <PasswordGroup>
          <Input
            onBlur={(e) => {
              if (e.target.value === checkPassword) {
                setWrongPassword(false);
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            title="Sua senha para login"
            type={eye ? 'text' : 'password'}
            value={password}
          />
          <Eye
            onMouseDown={(e) => setEye(true)}
            onMouseUp={(e) => setEye(false)}
          />
        </PasswordGroup>

        <Input
          onBlur={(e) => {
            if (e.target.value === password) {
              setWrongPassword(false);
            } else {
              setWrongPassword(true);
            }
          }}
          onChange={(e) => setCheckPassword(e.target.value)}
          placeholder="Confirmar senha"
          style={wrongPassword ? red : pattern}
          title="Digite a mesma senha digitada acima"
          type={eye ? 'text' : 'password'}
          value={checkPassword}
        />

        <Button type="submit" name="Cadastrar" style={{ marginTop: 16 }} />
      </StyledForm>
      <Modal
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
        closeAfterTransition
        onClose={handleCloseModalCreate}
        open={modalCreate}
      >
        <Fade in={modalCreate}>
          <div className={classes.paper}>
            <CheckCircle />
            <h2 id="transition-modal-title">Cadastro realizado com sucesso!</h2>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        className={classes.modal}
        open={modalError}
        onClose={handleCloseModalError}
      >
        <Fade in={modalError}>
          <div className={classes.paper}>
            <Octagon />
            <h2 id="transition-modal-title">
              Confira se todos os campos estão <br /> preenchidos.
            </h2>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        className={classes.modal}
        open={modalError}
        onClose={handleCloseModalError}
      >
        <Fade in={modalError}>
          <div className={classes.paper}>
            <Octagon />
            <h2 id="transition-modal-title">
              Confira se todos os campos estão preenchidos.
            </h2>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        className={classes.modal}
        open={modalEmail}
        onClose={handleCloseModalEmail}
      >
        <Fade in={modalEmail}>
          <div className={classes.paper}>
            <Octagon />
            <h2 id="transition-modal-title">
              O email {email} já foi cadastrado.
            </h2>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default FormRegister;
