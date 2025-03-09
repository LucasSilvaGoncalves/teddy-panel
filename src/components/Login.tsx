import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './../App.css';
import './Login.css';

const Login: React.FC = () => {
  const [user, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', user);
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h2 className='title-login'>Olá, seja bem-vindo!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Digite o seu nome:"
            value={user}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-entrar">Entrar</button>
        
      </form>
    </div>
  );
};

export default Login;
