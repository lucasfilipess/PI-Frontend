import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '../../atoms/button';
import {
  checkTitle,
  checkCity,
  checkAddres,
  checkNeighborhood,
  searchUf,
  searchCep,
  checkDesciption,
} from '../../utils/formValidation';
import Fade from '@material-ui/core/Fade';
import { FiXOctagon, FiCheckCircle } from 'react-icons/fi';
import Input from '../../atoms/input';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Textarea from '../../atoms/textarea';

const CheckCircle = styled(FiCheckCircle)`
  color: #4caf50;
  height: 60px;
  margin-right: 20px;
  width: 60px;
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
  height: 75px;
  margin-right: 20px;
  width: 75px;
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
    width: 600,
    // height: 600,
  },
}));

function FormDonation() {
  const classes = useStyles();

  const history = useHistory();

  const token = localStorage.getItem('token');

  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [uf, setUf] = useState('');

  const [modalCreate, setModalCreate] = useState(false);
  const [modalError, setModalError] = useState(false);

  const [wrongAddress, setWrongAddress] = useState(false);
  const [wrongCep, setWrongCep] = useState(false);
  const [wrongCity, setWrongCity] = useState(false);
  const [wrongDescription, setWrongDescription] = useState(false);
  const [wrongTitle, setWrongTitle] = useState(false);
  const [wrongNeighborhood, setWrongNeighborhood] = useState(false);
  const [wrongUf, setWrongUf] = useState(false);

  const handleCloseModalCreate = () => {
    setModalCreate(false);
    history.push('/dashboard');
  };

  const handleCloseModalError = () => {
    setModalError(false);
  };

  const handleOpenModalCreate = () => {
    setModalCreate(true);
  };

  const handleOpenModalError = () => {
    setModalError(true);
  };

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      title,
      description,
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
      !wrongTitle &&
      !wrongNeighborhood &&
      !wrongUf &&
      (title && cep && city && uf && address && neighborhood) != ''
    ) {
      await api
        .post('donations', data, {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          console.log(response.status);
          handleOpenModalCreate();
        })
        .catch((error) => {
          console.log(
            'Server error: ',
            error.response.status,
            error.response.data.error
          );
        });
    } else {
      handleOpenModalError();
    }
  }

  async function useRegisteredAddress(e) {
    await api
      .get('donation/address', {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        const [loc] = response.data;
        setCep(loc.cep);
        setCity(loc.city);
        setUf(loc.uf);
        setAddress(loc.address);
        setNeighborhood(loc.neighborhood);
        setWrongAddress(false);
        setWrongCep(false);
        setWrongCity(false);
        setWrongNeighborhood(false);
        setWrongUf(false);
      })
      .catch((error) => console.log(error));
  }

  return (
    <StyledForm onSubmit={handleRegister}>
      <Input
        onBlur={(e) => setWrongTitle(checkTitle(e.target.value))}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        style={wrongTitle ? red : pattern}
        title="Seu nome"
        type="text"
        value={title}
      />

      <Textarea
        onBlur={(e) => setWrongDescription(checkDesciption(e.target.value))}
        onChange={(e) => setDescription(e.target.value)}
        style={wrongDescription ? red : pattern}
        placeholder="Descrição"
        title="Uma descrição sobre a doação"
        type="text"
        value={description}
      />

      <StyledButton
        onClick={useRegisteredAddress}
        name="Usar endereço cadastrado"
        type="button"
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
        onBlur={(e) => setWrongNeighborhood(checkNeighborhood(e.target.value))}
        onChange={(e) => setNeighborhood(e.target.value)}
        placeholder="Bairro"
        style={wrongNeighborhood ? red : pattern}
        title="Bairro onde reside"
        type="text"
        value={neighborhood}
      />

      <Button type="submit" name="Cadastrar" style={{ marginTop: 16 }} />

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
            <h2 id="transition-modal-title">
              Cadastro de doação realizado com sucesso!
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
              Confira se todos os campos estão <br /> preenchidos corretamente.
            </h2>
          </div>
        </Fade>
      </Modal>
    </StyledForm>
  );
}
export default FormDonation;
