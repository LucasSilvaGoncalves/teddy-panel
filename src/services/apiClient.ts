import axios from 'axios';

const API_URL = import.meta.env.VITE_TEDDY_API;

export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};

export const getClientById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};

export const AddClient = async (clientData: { name: string; salary: number; clientSalary: number }) => {
  try {
    const response = await axios.post(`${API_URL}/clients`, clientData);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};

export const editClient = async (id: number, clientData: { name: string; salary: number; clientSalary: number }) => {
    try {
        console.log('clientData', clientData, id);
      const response = await axios.put(`${API_URL}/clients/${id}`, clientData);
      return response.data;
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
      throw error;
    }
  };

export const deleteClientById = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};