import { Link } from 'react-router-dom';

import './styles.css'

function Home() {
  return (
    <div id='home-container'>
      <Link to="/newEntry">
          Novo <br/> Lançamento
      </Link>
      
      <Link to="/report">
          Relatório <br/> Mensal
      </Link>
    </div>
  );
};

export default Home;