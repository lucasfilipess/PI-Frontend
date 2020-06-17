import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../organisms/dashboardNavbar';
import styled from 'styled-components';
import MyDonationsCard from '../../molecules/myDonationsCard';
import api from '../../services/api';
import { format } from '../../utils/formValidation';
import profilePhoto from '../../assets/profilePhoto.svg';
import Button from '../../atoms/button';
import Footer from '../../molecules/footer';
import { OptionsModal } from '../../molecules/modals';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  justify-content: center;
  width: 100%;
`;
const MyDonations = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 520px);
  grid-gap: 24px;
  justify-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-right: 50px;
`;
const MyProfile = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-left: 150px;
`;

const Item = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;

  & > span {
    font-weight: bold;
    color: #4caf50;
    margin-right: 5px;
    font-size: 18px;
  }
  & > p {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 50px 0 100px 0;
  justify-content: center;
  & > img {
    height: 150px;
    width: 150px;
  }
`;

const Group = styled.div`
  display: flex;
  & > div {
    width: 50%;
  }
  & > div + div {
    width: 50%;
  }
`;

function Profile() {
  const token = localStorage.getItem('token');
  const [myDonations, setMyDonations] = useState([]);
  const [user, setUser] = useState([]);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);

  async function handleDeleteDonation(id) {
    api.delete(`donations/${id}`, {
      headers: {
        authorization: token,
      },
    });
  }

  useEffect(() => {
    async function getDonations() {
      api
        .get('profile/donations', {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          setMyDonations(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert('Faça Login');
          } else {
            console.log('internal server error');
          }
        });
    }
    async function getUser() {
      api
        .get('profile', {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert('Faça Login');
          } else {
            console.log('internal server error');
          }
        });
    }
    getDonations();
    getUser();
  }, [token, myDonations]);
  return (
    <>
      <Navbar />
      <Container>
        <ProfileContainer>
          <img src={profilePhoto} alt="Profile icon" />
          {user.map((item) => (
            <MyProfile key={item.id}>
              <Group>
                <Item>
                  <span>Nome:</span>
                  <p>{item.name}</p>
                </Item>
                <Item>
                  <span>Doações:</span>
                  <p>{myDonations.length}</p>
                </Item>
              </Group>
              <Group>
                <Item>
                  <span>Email:</span>
                  <p>{item.email}</p>
                </Item>
                <Item>
                  <span>Whatsapp:</span>
                  <p>{format(item.whatsapp)}</p>
                </Item>
              </Group>
              <Button
                name="Editar perfil"
                onClick={() => history.push('edit-profile')}
              />
            </MyProfile>
          ))}
        </ProfileContainer>
        <MyDonations>
          {myDonations.map((donation) => (
            <MyDonationsCard
              key={donation.id}
              title={donation.title}
              description={donation.description}
              cep={donation.cep}
              city={donation.city}
              address={donation.address}
              uf={donation.uf}
              neighborhood={donation.neighborhood}
              btn1="Apagar"
              btn2="Editar"
              handleDelete={() => {
                setId(donation.id);
                setModal(true);
              }}
              handleUpdate={() => history.push(`edit-donation/${donation.id}`)}
            />
          ))}
        </MyDonations>
      </Container>
      <Footer style={{ marginTop: '100px' }} />
      <OptionsModal
        open={modal}
        fadein={modal}
        close={modal}
        text="Tem certeza que deseja apagar a doação ?"
        btn1="Não"
        btn2="Sim"
        onClick1={() => setModal(false)}
        onClick2={() => {
          handleDeleteDonation(id);
          setModal(false);
        }}
      />
    </>
  );
}
export default Profile;
