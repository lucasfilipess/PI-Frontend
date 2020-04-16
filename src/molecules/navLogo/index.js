import React from 'react';
import styled from 'styled-components';
import FertilizerImg from '../../atoms/fertilizerImg';
import { useHistory } from 'react-router-dom';

const NavButton = styled.button`
  &&& {
    border: 0;
    font: 500 25px Roboto, sans-serif;
    background: transparent;
    margin: 0 6px 0 10px;
    color: #4caf50;
    transition: color 0.2s;
    &:hover {
      color: #dcdce6;
    }
  }
`;

function NavLogo() {
  const name = localStorage.getItem('name');
  const history = useHistory();

  return (
    <div>
      <NavButton onClick={() => history.push('dashboard')}>
        <FertilizerImg />
      </NavButton>
      <NavButton onClick={() => history.push('profile')}>{name}</NavButton>
    </div>
  );
}
export default NavLogo;
