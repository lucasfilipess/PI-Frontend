import React, { useState, useEffect } from 'react';
import Button from '../../atoms/button';
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

const Options = styled.div`
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
  & > Button + Button {
    color: #d32f2f;
    border: 1px solid #d32f2f;
    &:hover {
      background: #d32f2f;
      color: #fff;
      filter: brightness(100%);
    }
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
function MydonationCard({
  title,
  description,
  cep,
  city,
  address,
  uf,
  neighborhood,
  handleDelete,
  handleUpdate,
  btn1,
  btn2,
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
      <Options>
        <Button onClick={handleUpdate} name={btn2} />
        <Button onClick={handleDelete} name={btn1} />
      </Options>
    </Card>
  );
}
export default MydonationCard;
