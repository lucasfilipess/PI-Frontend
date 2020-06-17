import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import fertilizerLogo from '../../assets/fertilizerLogo.svg';
import SectionHome from '../../molecules/sectionHome';
import Footer from '../../molecules/footer';

const StyledNavbar = styled(Navbar)`
  &&& {
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    background: transparent;
    transition: background 0.2s, border-bottom 0.2s;
    ${(props) =>
      props.active
        ? 'background: #424242; border-bottom:2px solid #4caf50;'
        : 'background:transparent; border-bottom:2px solid transparent;'}
  }
`;

const Login = styled(Link)`
  &&& {
    background: transparent;
    font-size: 18px;
    height: 55px;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s;
    width: 122px;
    ${(props) =>
      props.active
        ? 'color:  #4caf50;  &:hover {color: #fff;} '
        : ' color: #fff;  &:hover {color: #4caf50;}'}
  }
`;
const Register = styled(Link)`
  &&& {
    border-radius: 4px;
    font-size: 18px;
    font-weight: bold;
    height: 100%;
    padding: 15px;
    margin: 0 30px;
    text-align: center;
    text-decoration: none;
    transition: background 0.2s, color 0.2s, border 0.2s;
    width: 122px;

    ${(props) =>
      props.active
        ? 'color:  #4caf50;  &:hover {color: #fff; background: #4caf50;}  border: 2px solid #4caf50; '
        : ' color: #fff;  &:hover {background: #4caf50;color: #dcdce6;border: 2px solid #4caf50;}  border: 2px solid #fff;'}
  }
`;

const Btns = styled.div`
  margin-left: auto;
`;

const Logo = styled.img`
  margin-left: 30px;
  max-height: auto;
  max-width: 60px;
`;
const LogoName = styled.p`
  color: #4caf50;
  font-size: 24px;
  font-family: 'Roboto Slab', serif;
  font-weight: 500;
  margin: 0;
`;
const ContainerLogo = styled.button`
  display: flex;
  justify-content: center;
  background: transparent;
  border: 0;
  align-items: center;
  display: ${(props) => (props.active ? 'flex' : 'none')};
  &:hover {
    & > p {
      color: #f5f5f6;
      transition: color 0.2s;
    }
  }
`;

function Home() {
  const [active, setActive] = useState(false);
  const checkScrollTop = () => {
    if (!active && window.pageYOffset > 10) {
      setActive(true);
    } else if (active && window.pageYOffset <= 10) {
      setActive(false);
    }
  };
  window.addEventListener('scroll', checkScrollTop);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <StyledNavbar fixed="top" active={active}>
        <ContainerLogo active={active} onClick={scrollTop}>
          <Logo src={fertilizerLogo} alt="Logo" />
          <LogoName>RE ALIMENTE</LogoName>
        </ContainerLogo>
        <Btns>
          <Login to="/login" active={active}>
            Login
          </Login>
          <Register to="/register" active={active}>
            Cadastre-se
          </Register>
        </Btns>
      </StyledNavbar>
      <SectionHome />
      <Footer />
    </>
  );
}
export default Home;
