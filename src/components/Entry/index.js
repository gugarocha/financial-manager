import { FiPlus, FiMinus } from 'react-icons/fi';
import formatValueToCurrency from '../../utils/formatValueToCurrency';
import './styles.css';

export default function Entry({ data }) {
  const { datetime, entryName, value, category } = data;
  const date = new Date(datetime.seconds * 1000).toLocaleDateString('pt-br');

  return (
    <ul id='entryContainer'>
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
          { category === 'credit'? <FiPlus size={15} /> : <FiMinus size={15} /> }
          {formatValueToCurrency(value)}
        </span>
      </li>
    </ul>
  );
};