import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TextBox = styled.div`
  overflow: scroll;
  word-wrap: break-word;
  height: 150px;
  margin: 20px 0;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  width: 100%;
  width: 520px;
  padding: 0 30px;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;
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
  & > div {
    display: flex;
    margin: 10px 0;
    & > strong {
      margin-right: 6px;
    }
    & > strong + p {
      margin: 0 30px 0 0;
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

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
function DonationCard({
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
      <div>
        <Title>{title}</Title>
      </div>
      <TextBox>
        <p>{description}</p>
      </TextBox>
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
