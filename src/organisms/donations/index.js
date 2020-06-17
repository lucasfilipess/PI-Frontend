import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DonationCard from '../../molecules/donationCard';
import styled from 'styled-components';
import { format } from '../../utils/formValidation';

const Grid = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 520px);
  grid-gap: 24px;
  list-style: none;
  justify-items: center;
  justify-content: center;
  margin-top: 100px;
`;

function Donations() {
  const [donations, setDonations] = useState([]);
  const token = localStorage.getItem('token');
  // const msg = 'teste de msg whatsapp';

  useEffect(() => {
    api
      .get('donations', {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setDonations(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('Faça Login');
        } else {
          console.log('internal server error');
        }
      });
  }, [token]);

  return (
    <Grid>
      {donations.map((donation) => (
        <DonationCard
          key={donation.id}
          name={donation.name}
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
    </Grid>
  );
}
export default Donations;
