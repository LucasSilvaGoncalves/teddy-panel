import React from 'react';
import './Card.css';

interface CardProps {
  name: string;
  salary: number;
  clientSalary: number;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ name, salary, clientSalary, onEdit, onDelete, onAdd }) => {
  return (
    <div className="card">
      <div className="content">
        <h3 className="title">{name}</h3>
        <p className="text">Salário: R${salary.toFixed(2)}</p>
        <p className="text">Empresa: R${clientSalary.toFixed(2)}</p>
      </div>

      <div className="actions">
        <button onClick={onAdd} className="button">
          <img src="src/assets/icons/plus.png" alt="Adicionar" className="icon" />
        </button>
        <button onClick={onEdit} className="button">
          <img src="src/assets/icons/pencil.png" alt="Editar" className="icon" />
        </button>
        <button onClick={onDelete} className="button">
          <img src="src/assets/icons/trash.png" alt="Excluir" className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Card;