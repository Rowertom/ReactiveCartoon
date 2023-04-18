
import './style.css';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs/';
import { useNavigate } from 'react-router-dom';
import { findLike } from '../../utils/utils';
import { Comment } from '../comments/Comments';
import { Modal } from '../modal/Modal';
import { UpdatePost } from '../updatePost/UpdatePost';



export const Post = ({ post, onPostLike, currentUser, onSendReview, onDeleteComment }) => {

  const [like, setLike] = useState(false);
  const [updatePostModal, setUpdatePostModal] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isLiked = findLike(post, currentUser);
    setLike(isLiked)
    console.log(post);
  }, [post?.likes])

  function handleLikeClick(e) {
    onPostLike(post);
  }

  return (
    <>
      <button className='post_btn btn__type__primary' onClick={() => navigate(-1)}>{'< '}Назад</button>
      <div className='post_card container'>
        <div className='post_header'>
          <div className='post__title'><h2>{post.title}</h2></div>
        </div>
        <div className='post__desc'>
          <img className='post__image'
            src={post.image}
            alt='изображение' />
          <div className='post__info'>
            <div className='post_info__header'>
              <img src={post?.author?.avatar} alt='avatar' className='post__author__ava' />
              <div className='post_author__name'><h3>{post?.author?.name}</h3></div>
            </div>
            <div className="post__info__date">
              <span className='post__info__date__title'>  Пост создан: </span>
              {dayjs(post.created_at).format("DD.MM.YYYY")}
            </div>
            <div className='post__info__like'>
              {<span>{like ? "В избранном" : "В избранное"}</span>}
              <button className={`post__favorite ${like ? 'post__liked' : ''}`} onClick={(e) => handleLikeClick(e)}>
                <Like />
              </button>
            </div>
            <div className="post__update__btn">
            {currentUser?._id === post.author._id &&
              <button className='post__update btn__type__primary' onClick={() => setUpdatePostModal(true)}>Редактировать пост</button>}
              {updatePostModal && <Modal activeModal={updatePostModal} setShowModal={setUpdatePostModal}>
                <UpdatePost post={post} setCreatePostModal={setUpdatePostModal} onSendReview={onSendReview} />
              </Modal>}
            </div>
            <div className='post__data__tag'>
              {post.tags?.map((e) => (<span key={e} className='post__data__tag__span'>{e}</span>))}
            </div>
          </div>
        </div>
        <div>
          <p className='post__text'>{post.text}</p>
        </div>
        <Comment
          post={post}
          onSendReview={onSendReview}
          onDeleteComment={onDeleteComment}
          currentUser={currentUser}
        />
      </div>
    </>
  );
};

