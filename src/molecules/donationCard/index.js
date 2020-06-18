import React from 'react';
import styled from 'styled-components';
import profile from '../../assets/profileCard.svg';

const TextBox = styled.div`
  overflow: scroll;
  word-wrap: break-word;
  height: 150px;
  margin: 20px 30px;
  -ms-overflow-style: none;
  font-size: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  width: 520px;
  background: #fff;
  border-radius: 8px;
  position: relative;
  padding-bottom: 30px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border: 2px solid #4caf50;
  & > strong {
    display: block;
    margin-bottom: 16px;
    color: #41414d;
  }
  & > p + strong {
    margin-top: 32px;
  }

  & > p {
    color: #737380;
    line-height: 21px;
    font-size: 16;
  }
  margin-right: 0;
`;

const Location = styled.div`
  margin: 0 30px;
  & > div {
    display: flex;
    margin: 10px 0;
    & > strong {
      margin-right: 6px;
      font-size: 17px;
    }
    & > strong + p {
      margin: 0 30px 0 0;
      font-size: 17px;
    }
  }
`;

const Contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
  & > Button {
    width: 180px;
    color: #4caf50;
    border: 1px solid #4caf50;
    background: transparent;
    transition: color 0.2s, background 0.2s;
    &:hover {
      background: #4caf50;
      color: #fff;
      filter: brightness(100%);
    }
  }
  & > div {
    width: 180px;
    height: 55px;
    line-height: 55px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    color: #4caf50;
    border: 1px solid #4caf50;
    background: transparent;
    transition: color 0.2s, background 0.2s;
  }
  & > div + a {
    width: 180px;
    height: 55px;
    line-height: 55px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    color: #757575;
    border: 1px solid #757575;
    background: transparent;
    transition: color 0.2s, background 0.2s;
    &:hover {
      background: #757575;
      color: #fff;
    }
  }
`;
const HeaderName = styled.div`
  background: #4caf50;
  /* border-top-left-radius: 8px; */
  /* border-top-right-radius: 8px; */
  height: 50px;
  display: flex;
  align-items: center;
  color: #fff;
  margin-bottom: 20px;
  img {
    height: 40px;
    width: 40px;
    margin: 0 10px 0 30px;
    border-radius: 100%;
  }
  p {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
  }
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
`;
function DonationCard({
  name,
  title,
  description,
  cep,
  city,
  address,
  uf,
  neighborhood,
  sendEmail,
  whatsapp,
}) {
  return (
    <Card>
      <HeaderName>
        <img src={profile} alt="profile photo" />
        <p>{name}</p>
      </HeaderName>
      <div style={{ marginLeft: '30px' }}>
        <Title>{title}</Title>
      </div>
      <TextBox>
        <p>{description}</p>
      </TextBox>
      <Title
        style={{
          fontSize: '20px',
          color: '#000',
          marginLeft: '30px',
          marginBottom: '20px',
        }}
      >
        Endereço de Coleta:
      </Title>
      <Location>
        <div>
          <strong>CEP:</strong>
          <p>{cep}</p>
        </div>
        <div>
          <strong>Cidade:</strong>
          <p>{city}</p>
          <strong>UF:</strong>
          <p>{uf}</p>
        </div>
        <div>
          <strong>Rua:</strong>
          <p>{address}</p>
        </div>
        <div>
          <strong>Bairro:</strong>
          <p>{neighborhood}</p>
        </div>
      </Location>
      <Contact>
        <div>{whatsapp}</div>
        <a href={sendEmail}>Email</a>
      </Contact>
    </Card>
  );
}
export default DonationCard;
