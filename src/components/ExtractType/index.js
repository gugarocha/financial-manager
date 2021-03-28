import { FiMinus } from 'react-icons/fi';
import formatValueToCurrency from '../../utils/formatValueToCurrency';
import './styles.css';

export default function ExtractType({ title, value }) {
  return (
    <div id='extractTypeContainer'>
      <h5>{title}</h5>
      <div className='extractTypeValue'>
        <span>
          {title === 'Saldo Mensal' && value < 0 ? <FiMinus /> : ''}
          {formatValueToCurrency(value)}
        </span>
      </div>
    </div>
  )
};