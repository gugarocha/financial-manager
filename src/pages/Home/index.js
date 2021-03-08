import { Link } from 'react-router-dom';

import './styles.css'

function Home() {
  return (
    <div className={'container'}>
      <Link href="/newEntry">
          Novo <br/> Lançamento
      </Link>
      
      <Link href="/report">
          Relatório <br/> Mensal
      </Link>
    </div>
  );
};

export default Home;