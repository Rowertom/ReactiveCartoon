import { useForm } from 'react-hook-form';
import './style.scss'
import { Form } from '../form/Form';
import { api } from '../../utils/Api';

export const CreatePost = ({ setCreatePostModal }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    const createPost = async (data) => {
        let arr = data.tags.split(" "); 
        try {
           const res =  await api.createPost({...data, tags : [...arr]});
           setCreatePostModal(false);
           reset();

        } catch (error) {
            
        }
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