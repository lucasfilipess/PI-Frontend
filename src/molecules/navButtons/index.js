import React from 'react';
import styled from 'styled-components';

import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 16px 0 auto;
  height: 60px;
  & > button {
    height: 55px;
    width: 55px;
    border-radius: 4px;
    border: 1px solid #dcdce6;
    background: transparent;
    margin-left: 16px;
    transition: color 0.2s, border-color 0.2s;
    & > svg {
      color: #dcdce6;
      transition: color 0.2s, border-color 0.2s;
    }
    &:hover {
      border-color: #c62828;
      & > svg {
        color: #c62828;
      }
    }
  }
`;

const CreateDonation = styled(Link)`
  &&& {
    background: transparent;
    border: 1px solid #4caf50;
    border-radius: 4px;
    color: #4caf50;
    font-size: 18px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    width: 122px;
    &:hover {
      background: #4caf50;
      color: #dcdce6;
    }
  }
`;

function NavButtons() {
  const history = useHistory();

  function handleLogOut() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <ButtonGroup>
      <CreateDonation to="donation/new"> Nova doação </CreateDonation>
      <button onClick={handleLogOut}>
        <FiPower size={18} />
      </button>
    </ButtonGroup>
  );
}
export default NavButtons;
