import ImageAvatar from './avatar/Avatar';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { ReactComponent as Basket } from '../../assets/icons/basket.svg';
import './style.css';
import { Link } from 'react-router-dom';
import { findLike } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangePostLike, fetchDeletePost } from '../../storage/cardsSlice/cardsSlice';
import { toast } from "react-toastify";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useState } from 'react';

export const Card = ({ date, image, title, text, author, posts }) => {

  const [open, setOpen] = useState(false);

  const currentUser = useSelector(s => s.user.data);
  const dispatch = useDispatch();

  //функция лайка поста
  const isLiked = findLike(posts, currentUser);
  function handleLikeClick() {
    dispatch(fetchChangePostLike(posts));
  }

  //функция отказа от удаления
  const handleCloseNo = () => {
    setOpen(false);
  }

  //функция подтверждения удаления
  const handleCloseYes = () => {
    setOpen(false);
    return true;
  }

  //Функция удаления поста
  const deletePost = (result) => {
    dispatch(fetchDeletePost(posts));
  }

  //функция проверки права удаления поста
  function handleDeleteClick() {
    if (posts.author._id === currentUser._id) {
      setOpen(true);
    } else {
      toast.warn('Вы не можете удалить чужой пост');
    }
  }

  return (
    <div className='card'>
      <div className='card__header'>
        <div className='card__author__ava'>
          <ImageAvatar className='card__avatar' authorSrc={author?.avatar} />
        </div>
        <div className='card__author__data'>
          <h3 className='author__name'>{author?.name}</h3>
        </div>
        <button className={`card__favorite ${isLiked ? 'card__liked' : ''}`} onClick={handleLikeClick}>
          <Like className='card__liked' />
          <span className='count__likes'>{posts?.likes?.length}</span>
        </button>
      </div>
      <div className='card__data'>
        <div>
          <Link to={`/post/${posts._id}`} className='link'>
            <img src={image} alt='card__image' className='card__image' />
          </Link>
        </div>
        <div className='card__data__tag'>
          {posts.tags?.map((e) => (<span key={e} className='post__data__tag__span'>{e}</span>))}
        </div>
      </div>
      <div className='card__desc'>
        <h2 className='card__title'>{title}</h2>
        <p className='card__text'>{text}</p>
      </div>
      <div className='card__links'>
        <div>
          <button className='btn btn__type__primary'>
            <Link to={`/post/${posts._id}`} className='link'>Читать подробнее</Link>
          </button>
        </div>
        <div className='card__footer'>
          <p className='author__date'>{date}</p>
          <Basket onClick={handleDeleteClick} className='delete__post' />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleCloseNo || handleCloseYes}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены что хотите удалить пост?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNo}>Нет</Button>
          <Button onClick={() => deletePost(handleCloseYes)} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};