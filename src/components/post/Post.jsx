
import './style.css';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { useEffect, useState } from 'react';
import { api } from '../../utils/Api';
import dayjs from 'dayjs/';
import { useNavigate } from 'react-router-dom';



export const Post = ({ id }) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    api.getPostsById(id).then((data) => setPost(data))
  }, [id])

const navigate= useNavigate();

  return (
    <>
    <button className='post_btn btn__type__primary' onClick={()=>navigate(-1)}>{'< '}Назад</button>
      <div className='post_card'> 
        <div className='post_header'>
          <div className='post__title'><h2>{post.title}</h2></div>
        </div>
        <div className='post__desc'>
          <div className='post_imgWrapper'>
            <img className='post__image'
              src={post.image}
              alt='изображение' />
          </div>
          <div className='post_info'>
            <div className='post_info__header'>
            <img src={post?.author?.avatar} alt='avatar' className='post__author__ava'/>
            <div className='post_author__name'><h3>{post?.author?.name}</h3></div>
            </div>
            <div>{dayjs(post.created_at).format("DD.MM.YYYY")}
            <div>
            <button className='post__favorite'>
                <Like />
              {post?.likes?.length !== 0 && <span className='post__likes'>{post?.likes?.length}</span>}
              </button>
              </div>
            </div>
            <div className='post__data__tag'>
              {post.tags?.map((e) => <span className='post__data__tag__span'>{e}</span>)}
            </div>
          </div>
        </div>
        <div>
          <p className='post__text'>{post.text}</p>
        </div>
        <div>comment</div>
      </div>
    </>
  );
};

