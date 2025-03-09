import React, { useState } from 'react';
import Card from './../card/Card';
import Modal from '../Modal';
import DeleteModal from '../DeleteModal';
import { deleteClientById, AddClient, editClient } from '../../services/apiClient';
import { toast } from 'react-toastify';

interface ListingProps {
  cardsData: { id: number; name: string; salary: number; clientSalary: number }[];
}

const Listing: React.FC<ListingProps> = ({ cardsData }) => {
  const cardsPerPage = 16;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clients, setClients] = useState(cardsData);
  const [currentClient, setCurrentClient] = useState<{ id: number; name: string; salary: number; clientSalary: number } | null>(null);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(cardsData.length / cardsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleCreate = async (clientData: { name: string; salary: number; clientSalary: number }) => {
    try {
      const newClient = await AddClient(clientData);
      setClients([...clients, newClient]);
      setIsModalOpen(false);
      toast.success('Cliente criado com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      toast.error('Erro ao criar cliente');
    }
  };

  const handleEdit = async (clientData: { id: number; name: string; salary: number; clientSalary: number }) => {
    if (currentClient) {  
      try {
      const updatedClient = await editClient(currentClient.id, clientData);
      setClients(clients.map(client => client.id === clientData.id ? updatedClient : client));
      setIsEditModalOpen(false);
      toast.success('Cliente editado com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
      toast.error('Erro ao editar cliente');
    }}
  };

  const handleDelete = async () => {
    if (currentClient) {
      try {
        await deleteClientById(currentClient.id);
        setClients(clients.filter(client => client.id !== currentClient.id));
        setIsDeleteModalOpen(false);
        toast.success('Excluído com sucesso!');
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        toast.error('Erro ao deletar cliente');
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = (client: { id: number; name: string; salary: number; clientSalary: number }) => {
    setCurrentClient(client);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (client: { id: number; name: string; salary: number; clientSalary: number }) => {
    setCurrentClient(client);
    setIsDeleteModalOpen(true);
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.header, display: 'flex', justifyContent: 'space-between' }}>
        <span><b>{currentCards.length}</b> clientes encontrados:</span>
        <div>
          <span>Clientes por página: </span>
          <select value={cardsPerPage} disabled>
        <option value={16}>16</option>
          </select>
        </div>
      </div>

      <div style={styles.cardContainer}>
        {currentCards.map((card, index) => (
          <Card
            key={index}
            name={card.name}
            salary={card.salary}
            clientSalary={card.clientSalary}
            onAdd={() => console.log('Adicionar')}
            onEdit={() => openEditModal(card)}
            onDelete={() => openDeleteModal(card)}
          />
        ))}
      </div>
      <div style={styles.createButtonContainer}>
        <button style={styles.createButton} onClick={openModal}>
          Criar cliente
        </button>
      </div>
      <div style={styles.pagination}>
        <span>1</span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateClient={handleCreate}
      />
      {currentClient && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onCreateClient={handleEdit}
          initialData={currentClient}
        />
      )}
      {currentClient && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteClient={handleDelete}
          clientName={currentClient.name}
        />
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    margin: '0 auto',
    paddingTop: '200px',
  },
  header: {
    marginBottom: '18px',
    fontSize: '20px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  createButton: {
    fontWeight: 'bold',
    width: '100%',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f0f2f5',
    color: '#EC6724',
    border: '3px solid #EC6724',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  pageButton: {
    margin: '0 5px',
    height: '50%',
    width: '50%',
    padding: '10px 15px',
    border: '1px solidrgb(170, 197, 226)',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, color 0.3s',
    backgroundColor: '#fff',
  },
};

export default Listing;
