import logoSrc from './logo.png';
import './style.css';


export const Logo = () => {
  return (
    <a href='/' className='logo_text'>
      <img src={logoSrc} alt='лого компании' className='logo-pic' />
      REACTIVE CARTOONS
    </a>
  );
};
