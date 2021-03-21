import { useState } from "react";
import Calendar from "react-calendar";

import useEntries from "../../hooks/useEntries";

import Header from "../../components/Header";
import ExtractType from '../../components/ExtractType';
import Entry from '../../components/Entry';

import 'react-calendar/dist/Calendar.css';
import './styles.css';
import formatToMonthName from '../../utils/formatToMonthName';

function Report() {
  const [calendarOpened, setCalendarOpened] = useState(false);
  const [date, setDate] = useState(new Date());
  const [entries] = useEntries();

  function getTotalCategory(entries, category) {
    const total = entries.reduce((acumulator, entry) => {
      let sum = acumulator
      if (entry.category === category) {
        sum += entry.value
      }
      return sum;
    }, 0);

    return total || 0
  };

  const totalCredit = getTotalCategory(entries, 'credit');
  const totalDebit = getTotalCategory(entries, 'debit');
  const totalBalance = totalCredit - totalDebit;

  return (
    <div id="report-container">
      <Header page='Relatório Mensal' />

      <main>
        <div id='selectMonthContainer'>
          <p>
            Selecione o mês
          </p>
          <div
            className='calendarInput'
            onClick={() => setCalendarOpened(!calendarOpened)}
          >
            <input value={formatToMonthName(date)} />
            <Calendar
              className={calendarOpened ? 'calendarOpened' : 'calendarHide'}
              locale='pt-br'
              view='year'
              value={date}
              onClickMonth={(selectedMonth) => {
                setDate(selectedMonth)
                setCalendarOpened(false)
              }}
            />
          </div>

          <button className='searchButton'>Buscar</button>
        </div>

        <section id='extractsContainer'>
          <ExtractType
            title="Total de Créditos"
            value={totalCredit}
          />

          <ExtractType
            title="Total de Débitos"
            value={totalDebit}
          />

          <ExtractType
            title="Saldo Mensal"
            value={totalBalance}
          />
        </section>

        <section id='entriesTableContainer'>
          <ul className='entriesTableHeader'>
            <li className='entriesDatesHeader'>
              <span>Data</span>
            </li>

            <li className='entriesNamesHeader'>
              <span>Lançamento</span>
            </li>

            <li className='entriesValuesHeader'>
              <span>Valor</span>
            </li>
          </ul>

          {  entries
            ? entries.map(entry => <Entry data={entry} key={entry.id} />)
            : (<p>Carregando</p>)
          }

        </section>
      </main>
    </div>
  );
};

export default Report;