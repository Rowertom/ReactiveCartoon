import { useForm } from 'react-hook-form';
import './style.scss'
import { Form } from '../form/Form';
import { useDispatch } from 'react-redux';
import { fetchAddPost } from '../../storage/cardsSlice/cardsSlice';

export const CreatePost = ({ setCreatePostModal }) => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

     // запрос создания поста
    const createPost = async (data) => {
        let arr = data.tags.split(" ");
        await dispatch(fetchAddPost({ ...data, tags: [...arr] }));
        setCreatePostModal(false);
        reset();
    }

    return <div className="create">
        <button className='create__btn btn__type__primary' onClick={() => setCreatePostModal(false)}>x</button>
        <div>
            <Form title={'Создать пост'} submitForm={handleSubmit(createPost)}>
                <input type="text" className="create__post__input" placeholder='Заголовок' {...register('title', { required: true })} />
                <textarea type="text" className="create__post__input" placeholder='Описание' {...register('text', { required: true })} />
                <input type="text" className="create__post__input" placeholder='Картинка' {...register('image')} />
                <input type="text" className="create__post__input" placeholder='Теги' {...register('tags')} />
                <button className='create__btn__submit btn__type__primary' type="submit">Отправить</button>
            </Form>
        </div>
    </div>
}