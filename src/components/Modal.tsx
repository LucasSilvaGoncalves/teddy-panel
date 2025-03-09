import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClient: (clientData: { name: string; salary: number; clientSalary: string }) => void;
  initialData?: { name: string; salary: number; clientSalary: string };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreateClient, initialData }) => {
  const [name, setname] = React.useState('');
  const [salary, setsalary] = React.useState('');
  const [clientSalary, setclientSalary] = React.useState('');

  useEffect(() => {
    if (initialData) {
      setname(initialData.name);
      setsalary(initialData.salary.toString());
      setclientSalary(initialData.clientSalary);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && salary && clientSalary) {
      onCreateClient({ name, salary: parseFloat(salary), clientSalary });
      onClose();
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  return (
    isOpen && (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <button onClick={onClose} style={styles.closeButton}>
            <img src="src/assets/icons/close.png" alt="Close" style={styles.closeIcon} />
          </button>
          <h2>{initialData ? 'Editar cliente' : 'Criar cliente'}:</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder='Digite o nome:'
                value={name}
                onChange={(e) => setname(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="number"
                placeholder='Digite o salário:'
                value={salary}
                onChange={(e) => setsalary(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder='Digite o valor do salário da empresa:'
                value={clientSalary}
                onChange={(e) => setclientSalary(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.buttons}>
              <button type="submit" style={{ ...styles.submitButton, ...styles.input }}>
                {initialData ? 'Salvar' : 'Criar cliente'}
              </button>
            </div>
          </form>
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
    width: '600px',
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
    position: 'absolute',
    marginLeft:'400px',
  },
  inputGroup: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submitButton: {
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Modal;
