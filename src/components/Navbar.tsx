import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="main-logo">
        <img src="teddy-logo.png" alt="Logo" className="logo-img" />
      </div>
      <div className="nav-links">
        <a href="#">Clientes</a>
        <a href="#">Clientes selecionados</a>
        <a href="#" onClick={handleLogout}>Sair</a>
      </div>
      <div className="user-info">
        <span>Olá, <b>{username}</b></span>
      </div>
    </div>
  );
};

export default Navbar;
