import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import Logo from '../../atoms/logo';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import NewDonationCard from '../../organisms/newDonationCard';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

import api from '../../services/api';

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



const ProfileContainer = styled.div`
width:100%;
max-width:1180px;
padding: 0 30px;
margin: 32px auto;
& > h1{
  margin-top:80px;
  margin-bottom:24px;

}
& > ul{
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap:24px;
  list-style:none;

}
& > ul > li{
  background: #fff;
  padding:24px;
  border-radius:8px;
  position:relative;

}
& > ul > li > button{
  position:absolute;
  right: 24px;
  top:24px;
  border:0;
  &:hover{
    opacity: 0.8;
  }
}

& > ul > li > strong{
  display:block;
  margin-bottom:16px;
  color:#41414d;
}
& > ul > li > p + strong{
  margin-top:32px;
}

& > ul > li > p{
  color:#737380;
  line-height:21px;
  font-size:16;
  
}

`;

const StyledHeader = styled.header`
display:flex;
align-items:center;
& > span{
  font-size:20px;
  margin-left:24px;
}
& > a {
  width:260px;
  margin-left: auto;
  margin-top:0;
}
& > button{
  height:60px;
  width:60px;
  border-radius:4px;
  border: 1px solid #dcdce6;
  background: transparent;
  margin-left:16px;
  transition: border-color 0.2s;
  &:hover{
    border-color:#999;
  }
}
`;

const CreateDonation = styled(Link)`
  background: #4caf50;
  border: 0;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  height: 60px;
  line-height: 60px;
  text-align: center;
  text-decoration: none;
  transition: filter 0.2s;
  width: 100%;
  &:hover{
    filter: brightness(90%);

  }
`;

function Dashboard() {
  const classes = useStyles();

  const [modalError, setModalError] = useState(false);

  const handleCloseModalError = () => {
    setModalError(false);
  };

  const handleOpenModalError = () => {
    setModalError(true);
  };


  useEffect(() => { }, []);


  return (
    <ProfileContainer>
      <StyledHeader>
        <Logo />
        <span>Bem vindo Lucas</span>
        <CreateDonation to='donation/new'> Nova doação </CreateDonation>
        {/* <button onClick={handleOpenModalError}>Doação</button> */}
        <button>
          <FiPower size={18} color="green" />
        </button>
      </StyledHeader>
      <h1>Doações Cadastradas</h1>
      <ul>
        <li>
          <strong>Title</strong>

          <strong>Description</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

          <strong>Amount</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

          <strong>Localization</strong>
          <p>cep</p>
          <p>city</p>
          <p>addres</p>
          <p>neighborhood</p>
          <p>uf</p>
          <button><FiTrash2 size={20} color="#a8a8b3" /></button>
        </li>

        <li>
          <strong>Title</strong>

          <strong>Description</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

          <strong>Amount</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

          <strong>Localization</strong>
          <p>cep</p>
          <p>city</p>
          <p>addres</p>
          <p>neighborhood</p>
          <p>uf</p>
          <button><FiTrash2 size={20} color="#a8a8b3" /></button>
        </li>

        <li>
          <strong>Title</strong>

          <strong>Description</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

          <strong>Amount</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

          <strong>Localization</strong>
          <p>cep</p>
          <p>city</p>
          <p>addres</p>
          <p>neighborhood</p>
          <p>uf</p>
          <button><FiTrash2 size={20} color="#a8a8b3" /></button>
        </li>

        <li>
          <strong>Title</strong>

          <strong>Description</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

          <strong>Amount</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

          <strong>Localization</strong>
          <p>cep</p>
          <p>city</p>
          <p>addres</p>
          <p>neighborhood</p>
          <p>uf</p>
          <button><FiTrash2 size={20} color="#a8a8b3" /></button>
        </li>

      </ul>

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
            <NewDonationCard />
          </div>
        </Fade>
      </Modal>
    </ProfileContainer>
  );
}
export default Dashboard;