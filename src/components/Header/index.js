import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

function Header({ page }) {
  return (
    <header id={'header-container'}>
      <Link to="/">
        <FiArrowLeft className={'icon'} size={30} />
      </Link>
      <h3>{page}</h3>
    </header>
  );
};

export default Header;