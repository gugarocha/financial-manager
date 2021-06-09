import Entry from "../Entry";

import './styles.css';

export default function EntriesTable({ entries, futureEntries }) {
  return (
    <>
      <div id="entriesContainer">
        {entries.length > 0
          ? entries.map(entry => <Entry data={entry} key={entry.id} />)
          : (<p className='tableMessage'>Nenhum registro encontrado</p>)
        }
      </div>

      <div id="futureEntriesContainer">
        {futureEntries.length > 0 && (
          <p className="futureEntriesMessage">Lançamentos Futuros</p>
        )}
        {futureEntries.map(entry => <Entry data={entry} key={entry.id} />)}
      </div>
    </>
  );
};