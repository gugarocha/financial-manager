import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

function Header({ page }) {
  const history = useHistory();

  return (
    <header id={'header-container'}>
      <div onClick={() => history.goBack()}>
        <FiArrowLeft className={'icon'} size={30} />
      </div>
      <h3>{page}</h3>
    </header>
  );
};

export default Header;