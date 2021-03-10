import './styles.css';

export default function ExtractType({ title, value }) {
  return (
    <div id='extractTypeContainer'>
      <h5>{title}</h5>
      <span>
        R$ {value.toFixed(2).replace('.', ',')}
      </span>
    </div>
  )
};