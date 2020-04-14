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
  height: 30px;
  margin-left: 302px; 
  padding-left: 10px;
  position:absolute;
  transition: color 0.2s;
  width: 30px;
  &:hover{
    color:#4caf50;
  }
`;

const Octagon = styled(FiXOctagon)`
  color: #f44336;
  height: 60px;
  margin-right: 20px;
  width: 60px;
`;


const PasswordGroup = styled.div`
  align-items:center;
  display:flex;
  position: relative;
  margin: 8px 0;
  min-width:350px;
`;

const pattern = {
  borderColor: '#dcdce6'
}

const red = {
  borderColor: '#f44336'
}

const StyledForm = styled.form`
  & > Input + Input {
    margin-top: 8px;
  }
  
  & > Input + Button{
    margin-top: 16px;
  }
  max-width: 350px;
  width: 100%;
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
    const data = ({
      email,
      password
    });

    if (!wrongEmail) {
      await api.post('login', data)
        .then(response => {
          localStorage.setItem('token', response.data.token);
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
  };

  return (
    <StyledForm onSubmit={handleLogin}>
      <Input
        onBlur={e => setWrongEmail(checkEmail(e.target.value))}
        onChange={e => setEmail(e.target.value)}
        placeholder='Email'
        style={wrongEmail ? red : pattern}
        title="Sua email para login"
        value={email}
      />


      <PasswordGroup>
        <Input
          onChange={e => setPassword(e.target.value)}
          placeholder='Senha'
          title="Sua senha para login"
          type={eye ? 'text' : 'password'}
          value={password}
        />
        <Eye
          onMouseDown={e => setEye(true)}
          onMouseUp={e => setEye(false)}
        />
      </PasswordGroup>

      <Button type='submit' name='Login' />


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

    </StyledForm>

  );
}
export default FormLogin;