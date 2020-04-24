import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '../../atoms/button';
import { checkEmail } from '../../utils/formValidation';
import { FiEye, FiXOctagon } from 'react-icons/fi';
import Fade from '@material-ui/core/Fade';
import Input from '../../atoms/input';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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

const Octagon = styled(FiXOctagon)`
  color: #f44336;
  height: 75px;
  margin-right: 20px;
  width: 75px;
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
  & > Input + div {
    margin-top: 8px;
  }

  & > div + Button {
    margin-top: 16px;
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

function FormLogin() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [eye, setEye] = useState(false);

  const history = useHistory();

  const [password, setPassword] = useState('');
  const [modalError, setModalError] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);

  const handleCloseModalError = () => {
    setModalError(false);
  };

  const handleOpenModalError = () => {
    setModalError(true);
  };

  async function handleLogin(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    if (!wrongEmail && email !== '' && password !== '') {
      await api
        .post('login', data)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', response.data.name);
          history.push('dashboard');
        })
        .catch((error) => {
          if (error.response.status === 404) {
            handleOpenModalError();
          } else {
            console.log('internal server error');
          }
        });
    } else {
      handleOpenModalError();
    }
  }

  return (
    <div>
      <StyledForm onSubmit={handleLogin}>
        <Input
          onBlur={(e) => setWrongEmail(checkEmail(e.target.value))}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={wrongEmail ? red : pattern}
          title="Sua email para login"
          value={email}
        />

        <PasswordGroup>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            title="Sua senha para login"
            type={eye ? 'text' : 'password'}
            value={password}
          />
          <Eye
            onMouseDown={() => setEye(true)}
            onMouseUp={() => setEye(false)}
          />
        </PasswordGroup>

        <Button type="submit" name="Login" />
      </StyledForm>

      <Modal
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
        closeAfterTransition
        onClose={handleCloseModalError}
        open={modalError}
      >
        <Fade in={modalError}>
          <div className={classes.paper}>
            <Octagon />
            <h2 id="transition-modal-title">Senha ou email inválidos</h2>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default FormLogin;
