import formatValueToCurrency from '../../utils/formatValueToCurrency';
import './styles.css';

export default function ExtractType({ title, value }) {
  return (
    <div id='extractTypeContainer'>
      <h5>{title}</h5>
      <span>
        {formatValueToCurrency(value)}
      </span>
    </div>
  )
};