import ImageAvatar from './avatar/Avatar';
import { ReactComponent as Like } from './like.svg';

import './style.css';

export const Card = ({date, image, title, text, author }) => {
  return (
    <div className='card'>
      <div className='card__header'>
          <div className='card__author__ava'>
          <ImageAvatar authorSrc={author.avatar}/>
          </div>
          <div className='card__author__data'>
                <h3 className='author__name'>{author.name}</h3>
          </div>
        <button className='card__favorite'>
          <Like className='card__liked' />
          </button>
      </div>
      <div className='card__data'>
        <div>
        <img src={image} alt='card__image' className='card__image' />
        </div>
        <div className='card__data__tag'>
            <span className='card__data__tag__span'>legendary</span>
            <span className='card__data__tag__span'>legendary</span>
        </div>
      </div>
        <div className='card__desc'>
          <h2 className='card__title'>{title}</h2>
          <p className='card__text'>{text}</p>
        </div>
        <div className='card__links'>
          <a href='/' className='btn btn__type__primary'>Читать подробнее</a>
          <a href='/' className='btn btn__type__comment'>Коментировать</a>
          <p className='author__date'>{date}</p>
        </div>
    </div >
  );
};