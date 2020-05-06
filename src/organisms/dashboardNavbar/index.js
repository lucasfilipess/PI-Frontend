import React from 'react';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import NavButtons from '../../molecules/navButtons';
import NavLogo from '../../molecules/navLogo';

const StyledNavbar = styled(Navbar)`
  display: flex;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: center;
  background: #424242;
  border-bottom: 2px solid #4caf50;
`;

function DashboardNavbar() {
  return (
    <StyledNavbar fixed="top" /* expand="lg" variant="light" bg="light" */>
      <NavLogo />
      <NavButtons />
    </StyledNavbar>
  );
}
export default DashboardNavbar;
