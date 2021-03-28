import { useState } from "react";
import dayjs from "dayjs";
import Calendar from "react-calendar";

import useEntries from "../../hooks/useEntries";

import Header from "../../components/Header";
import ExtractType from '../../components/ExtractType';
import Entry from '../../components/Entry';

import 'react-calendar/dist/Calendar.css';
import './styles.css';
import formatToMonthName from '../../utils/formatToMonthName';
import { getTotalCredit, getTotalDebit, getTotalBalance } from "../../utils/getExtractTotals";

function Report() {
  const initialDate = dayjs().date(1).hour(0).minute(0).second(0).millisecond(0).toDate();

  const [calendarOpened, setCalendarOpened] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [entries] = useEntries(date);

  const totalCredit = getTotalCredit(entries);
  const totalDebit = getTotalDebit(entries);
  const totalBalance = getTotalBalance(entries);

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

          {entries
            ? entries.length > 0
              ? (entries.map(entry => <Entry data={entry} key={entry.id} />))
              : (<p className='tableMessage'>Nenhum registro encontrado</p>)
            : (<p>Carregando</p>)
          }

        </section>
      </main>
    </div>
  );
};

export default Report;