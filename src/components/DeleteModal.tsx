import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteClient: () => void;
  clientName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDeleteClient, clientName }) => {
  return (
    isOpen && (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <button onClick={onClose} style={styles.closeButton}>
            <img src="src/assets/icons/close.png" alt="Close" style={styles.closeIcon} />
          </button>
          <h2>Excluir cliente</h2>
          <p>Você está prestes a excluir o cliente: <b>{clientName}</b></p>
          <div style={styles.buttons}>
            <button onClick={onDeleteClient} style={styles.deleteButton}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  closeIcon: {
    width: '30px',
    height: '30px',
    marginLeft:'550px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  deleteButton: {
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default DeleteModal;