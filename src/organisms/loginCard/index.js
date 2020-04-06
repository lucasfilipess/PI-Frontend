import React from 'react';
import FormLogin from '../../molecules/formLogin';
import './styles.css';
import Logo from '../../atoms/logo';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function LoginCard() {
  return (
    <div className='login-container'>
      <div className="fix-logo">
        <Logo />
      </div>
      <h1>Faça seu Login</h1>
      <div className='form-container' >
        <FormLogin />
        <Link className='back-link' to='/register'>
          <FiLogIn size={16} color='#4caf50' />
        Não tenho cadastro
      </Link>
      </div>
    </div>
  );
}
export default LoginCard;