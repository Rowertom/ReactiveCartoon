import ImageAvatar from './avatar/Avatar';
import { ReactComponent as Like } from './like.svg';

import './style.css';

export const Card = () => {
  return (
    <div className='card'>
      <div className='card__header'>
          <div className='card__author__ava'>
          <ImageAvatar/>
          </div>
          <div className='card__author__data'>
                <h3 className='author__name'>Bender</h3>
                <p className='author__date'>11.02.2023</p>
          </div>
        <button className='card__favorite'>
          <Like className='card__liked' />
          </button>
      </div>
      <div className='card__data'>
        <div>
        <img src="https://cs10.pikabu.ru/post_img/big/2019/08/28/11/1567017193122712086.jpg" alt='card__image' className='card__image' />
        </div>
        <div className='card__data__tag'>
            <span className='card__data__tag__span'>legendary</span>
            <span className='card__data__tag__span'>legendary</span>
        </div>
      </div>
        <div className='card__desc'>
          <h2 className='card__title'>Бендер Сгибальщик Родригес</h2>
          <p className='card__text'>Комический антигерой, сквернослов, алкоголик, заядлый курильщик сигар, почитатель порнографии для роботов (в виде электрических схем), клептоман, повар (его еда в большинстве случаев по меньшей мере несъедобна, часто опасна для жизни). В критической ситуации зачастую единственный, кто впадает в панику.</p>
        </div>
        <div className='card__links'>
          <a href='/' className='btn btn__type__primary'>Читать подробнее</a>
          <a href='/' className='btn btn__type__comment'>Коментировать</a>
        </div>
    </div >
  );
};