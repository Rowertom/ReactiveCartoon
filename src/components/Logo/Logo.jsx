import logoSrc from './logo.png';
import './style.css';


export const Logo = () => {
  return (
    <a href='/'>
      <img src={logoSrc} alt='лого компании' className='logo-pic' />
    </a>
  );
};
