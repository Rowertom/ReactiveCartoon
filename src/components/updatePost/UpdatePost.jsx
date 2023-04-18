import { useForm } from 'react-hook-form';
import './style.scss'
import { Form } from '../form/Form';
import { api } from '../../utils/Api';

export const UpdatePost = ({ post, setCreatePostModal, onSendReview }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    const updatePost = async (data) => {
        let arr = data?.tags?.split(","); 
        try {
           const newPost =  await api.updatePost(post._id, {title: data.title, text: data.text, image: data.image, tags : [...arr]});
           onSendReview(newPost);
           setCreatePostModal(false);
           reset();
            alert('Данные обновлены')
        } catch (error) {
            alert('Ошибка обновления')
        }
    }

    return <div className="update">
        <button className='update__btn btn__type__primary' onClick={() => setCreatePostModal(false)}>x</button>
        <div>
            <Form title={'Редактировать пост'} submitForm={handleSubmit(updatePost)}>
                <input {...register('title', { required: true })} type="text" className="update__post__input" placeholder='Заголовок' defaultValue={post?.title} />
                <textarea {...register('text', { required: true })} type="text" className="update__post__input__area" placeholder='Описание' defaultValue={post?.text}/>
                <input {...register('image')} type="text" className="update__post__input" placeholder='Картинка' defaultValue={post?.image}  />
                <input {...register('tags')} type="text" className="update__post__input" placeholder='Теги' defaultValue={post?.tags} /> 
                <button className='update__btn__submit btn__type__primary' type="submit">Отправить</button>
            </Form>
        </div>
    </div>
}