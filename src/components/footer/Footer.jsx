import { Link } from 'react-router-dom';
import './style.css';

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='contain'>
        <div className='footer__links footer__group'>
          <Link to={'/comments'} >Все отзывы</ Link>
          <a href='/'>Контакты</a>
          ©2023 Made by Alexey Martynenko && Lena Farhutdinova
        </div>
      </div>
    </div>
  )
}