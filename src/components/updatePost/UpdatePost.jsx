import { useForm } from 'react-hook-form';
import './style.scss'
import { Form } from '../form/Form';
import { useDispatch } from 'react-redux';
import { fetchUpdatePost } from '../../storage/cardsSlice/cardsSlice';
import { updatedPost } from '../../storage/postSlice/postSlice';



export const UpdatePost = ({ post, setCreatePostModal }) => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    //обновление данных поста и данных поста в каталоге
    const updatePost = async (data) => {
        let arr = data?.tags?.split(",");
        const newPost = await dispatch(fetchUpdatePost({ ...post, title: data.title, text: data.text, image: data.image, tags: [...arr] }));
        dispatch(updatedPost(newPost.payload));
        setCreatePostModal(false);
        reset();
    }

    return <div className="update">
        <button className='update__btn btn__type__primary' onClick={() => setCreatePostModal(false)}>x</button>
        <div>
            <Form title={'Редактировать пост'} submitForm={handleSubmit(updatePost)}>
                <input {...register('title', { required: true })} type="text" className="update__post__input" placeholder='Заголовок' defaultValue={post?.title} />
                <textarea {...register('text', { required: true })} type="text" className="update__post__input__area" placeholder='Описание' defaultValue={post?.text} />
                <input {...register('image')} type="text" className="update__post__input" placeholder='Картинка' defaultValue={post?.image} />
                <input {...register('tags')} type="text" className="update__post__input" placeholder='Теги' defaultValue={post?.tags} />
                <button className='update__btn__submit btn__type__primary' type="submit">Отправить</button>
            </Form>
        </div>
    </div>
}