import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Listing from './list/List';
import { getClients } from '../services/apiClient';
import './home.css';

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string | null>('');
  const [cardsData, setCardsData] = useState<any[]>([]);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName);

    const getData = async () => {
      try {
        const data = await getClients();
        setCardsData(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="home-container">
      <Navbar username={userName || ''} />
      <Listing cardsData={cardsData} />
    </div>
  );
};

export default Home;
