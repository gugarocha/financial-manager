import { useState } from 'react';
import { useHistory } from 'react-router';
import Calendar from 'react-calendar';

import { addEntry } from '../../services/firestore';

import Header from '../../components/Header';
import currencyMask from '../../utils/currencyMask';

import 'react-calendar/dist/Calendar.css';
import './styles.css';

function NewEntry({ location }) {
  const entry = location.state ?
    location.state :
    {
      id: null,
      datetime: new Date(),
      category: '',
      entryName: '',
      value: ''
    };

  const [calendarOpened, setCalendarOpened] = useState(false);
  const [date, setDate] = useState(entry.datetime);
  const [name, setName] = useState(entry.entryName);
  const [category, setCategory] = useState(entry.category);
  const [inputValue, setInputValue] = useState(entry.value);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const value = Number(inputValue.replace(/(,|\.)/g, '')) / 100;

    try {
      await addEntry({
        id: entry.id,
        datetime: date,
        entryName: name,
        category,
        value
      });

      alert('Lançamento registrado com sucesso');
      entry.id ? history.goBack() : history.go(0);
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar lançamento');
    };
  };

  return (
    <div id='new-entry-container'>
      <Header page='Novo Lançamento' />
      <main>
        <form onSubmit={handleSubmit}>
          <div className='inputBlock'>
            <label htmlFor="entryDate">Data do Lançamento</label>
            <input
              className='input'
              id="entryDate"
              required
              autoComplete='off'
              onClick={() => setCalendarOpened(!calendarOpened)}
              value={date.toLocaleDateString('pt-br')}
            />
            <Calendar
              className={calendarOpened ? 'calendarOpened' : 'calendarHide'}
              locale='pt-br'
              value={date}
              onChange={selectedDate => {
                setDate(selectedDate)
                setCalendarOpened(false)
              }}
            />
          </div>

          <div className='inputBlock'>
            <label htmlFor="entryName">Nome do Lançamento</label>
            <input
              className='input'
              id="entryName"
              required
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>

          <div className='inputBlock'>
            <label htmlFor="entrycategory">Categoria do Lançamento</label>
            <select
              className='input'
              id="entrycategory"
              required
              value={category}
              onChange={event => setCategory(event.target.value)}
            >
              <option value="" selected disabled hidden>Selecione a categoria</option>
              <option value="credit">Crédito</option>
              <option value="debit">Débito</option>
            </select>
          </div>

          <div className='inputBlock'>
            <label htmlFor="entryValue">Valor</label>
            <input
              className='input'
              id="entryValue"
              required
              placeholder='0,00'
              minLength={3}
              value={currencyMask(inputValue)}
              onChange={event => setInputValue(event.target.value)}
            />
          </div>

          <button
            className='confirmButton'
            type='submit'
          >
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewEntry;