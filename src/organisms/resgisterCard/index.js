import React from 'react';
import Logo from '../../atoms/logo';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import FormRegister from '../../molecules/formRegister'
import './styles.css';

function ResgisterCard() {
  return (
    <div className='login-container'>
      <div className="fix-logo">
        <Logo />
      </div>
      <h1>Faça seu Cadastro</h1>
      <div className='form-container' >
        <FormRegister />
        <Link className='back-link' to='/login'>
          <FiLogOut size={16} color='#4caf50' />
          Já tenho cadastro
        </Link>
      </div>
    </div>
  );
}
export default ResgisterCard;




