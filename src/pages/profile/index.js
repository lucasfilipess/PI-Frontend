import React, { useState, useEffect } from 'react';
import Navbar from '../../organisms/navbar';
import styled from 'styled-components';
import DonationCard from '../../molecules/donationCard';
import api from '../../services/api';
import { format } from '../../utils/formValidation';

const Container = styled.div`
  display: flex;
  margin-top: 100px;
  /* align-items: center; */
  justify-content: center;
`;
const MyDonations = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  /* height: 520px; */
`;
const MyProfile = styled.div`
  display: flex;
  flex-direction: column;
`;

function Profile() {
  const token = localStorage.getItem('token');
  const [myDonations, setMyDonations] = useState([]);

  useEffect(() => {
    api
      .get('donations/mydonations', {
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
  }, []);
  return (
    <div>
      <Navbar />
      <Container>
        <MyProfile>
          <p>Lucas</p>
          <p>Belo Horizonte</p>
          <p>MG</p>
          <p>3254552</p>
          <p>Rua tal de não sei o que</p>
          <p>Bairro tal de tal</p>
          <p>115</p>
          <p>A</p>
        </MyProfile>
        <MyDonations>
          {myDonations.map((donation) => (
            <DonationCard
              key={donation.id}
              title={donation.title}
              description={donation.description}
              cep={donation.cep}
              city={donation.city}
              address={donation.address}
              uf={donation.uf}
              neighborhood={donation.neighborhood}
              sendEmail={`mailto:${donation.email}`}
              whatsapp={format(donation.whatsapp)}
            />
          ))}
        </MyDonations>
      </Container>
    </div>
  );
}
export default Profile;
