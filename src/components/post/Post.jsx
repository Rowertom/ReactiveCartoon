
import './style.css';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { useEffect, useState } from 'react';
import { api } from '../../utils/Api';
import dayjs from 'dayjs/';


export const Post = ({ id }) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    api.getPostsById(id).then((data) => setPost(data))
  }, [id])

  // добавить аватар автора <img src={post.author.avatar}....
  // добавить имя автора {post.author.name}
  // для того чтоб кнопка назад работала нужно использовать useNavigate посмотри как у меня в дог фуде 



  return (
    <>
      <div className='post_card'>
        <button className='post_btn btn__type__primary'>Назад</button>
        <div className='post_header'>
          <div className='post__title'>{post.title}</div>
        </div>
        <div className='post__desc'>
          <div className='post_imgWrapper'>
            <img className='post__image'
              src={post.image}
              alt='изображение' />
          </div>
          <div className='post_info'>
            <div>avatar</div>
            <div>name</div>
            <div>{dayjs(post.created_at).format("DD.MM.YYYY")}</div>
            <div className='post__data__tag'>
              {post.tags?.map((e) => <span className='post__data__tag__span'>{e}</span>)}
              <button className='post__favorite'>
                <Like />
              </button>
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

