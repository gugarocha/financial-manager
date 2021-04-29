import { useState } from 'react';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

import { deleteEntry } from '../../services/firestore';
import formatValueToCurrency from '../../utils/formatValueToCurrency';
import './styles.css';

export default function Entry({ data }) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [deleteButtonColor, setDeleteButtonColor] = useState('#6a7777')

  const { datetime, entryName, value, category } = data;
  const date = new Date(datetime.seconds * 1000).toLocaleDateString('pt-br');

  return (
    <div
      id='entryContainer'
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
    >
      <ul className='entryListContainer'>
        <li className='entryDate'>
          <span>{date}</span>
        </li>

        <li className='entryName'>
          <span>{entryName}</span>
        </li>

        <li className={category === 'credit'
          ? 'creditCategory'
          : 'debitCategory'
        }>
          <span>
            {category === 'credit' ? <FiPlus size={15} /> : <FiMinus size={15} />}
            {formatValueToCurrency(value)}
          </span>
        </li>
      </ul>

      <div
        className='deleteButton'
        onClick={() => 
          window.confirm(`Tem certeza que deseja excluir o seguinte lançamento?
            Data: ${date}
            Nome: ${entryName}
            Valor: ${formatValueToCurrency(value)}
          `)
          && deleteEntry(data)
        }
        onMouseEnter={() => setDeleteButtonColor('#e74c3c')}
        onMouseLeave={() => setDeleteButtonColor('#6a7777')}
      >
        {showDeleteButton && (
          <FiTrash2 size={24} color={deleteButtonColor} />
        )}
      </div>
    </div>
  );
};