import { Link } from 'react-router-dom';
import logoSrc from '../../assets/icons/logo.png';
import './style.css';


export const Logo = () => {
  return (
    <Link to='/' className='logo_text'>
      <img src={logoSrc} alt='лого компании' className='logo-pic' />
      CREATIVE CARTOONS
    </Link>
  );
};
