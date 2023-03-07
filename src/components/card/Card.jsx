import ImageAvatar from './avatar/Avatar';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './style.css';
import { useContext } from 'react';
import { CardContext } from '../../context/CardContext';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';

export const Card = ({ date, image, title, text, author, posts }) => {

  const {handlePostLike, deleteOwnPost} = useContext(CardContext);
  const {currentUser} = useContext(UserContext);

  const isLiked = posts.likes.some((e) => e === currentUser._id);
  function handleLikeClick() {
    handlePostLike(posts);
  }
  function handleDeleteClick() {
    deleteOwnPost(posts);
  }

  return (
    <div className='card'>
      <div className='card__header'>
        <div className='card__author__ava'>
          <ImageAvatar authorSrc={author.avatar} />
        </div>
        <div className='card__author__data'>
          <h3 className='author__name'>{author.name}</h3>
        </div>
        <button className={`card__favorite ${isLiked ? 'card__liked' : ''}`} onClick={handleLikeClick}>
          <Like className='card__liked' />
          <span className='count__likes'>{posts.likes.length}</span>
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
        <div>
        <button  className='btn btn__type__primary'>
          <Link to={`/post/${posts._id}`} className='link'>Читать подробнее</Link>
          </button>
        <p className='author__date'>{date}</p>
        </div>
        <div>
        <a href='/' className='btn btn__type__comment'><CommentIcon/></a>
        <button className='btn btn__type__delete' onClick={handleDeleteClick}><DeleteForeverIcon/></button>
        </div>
      </div>
    </div >
  );
};