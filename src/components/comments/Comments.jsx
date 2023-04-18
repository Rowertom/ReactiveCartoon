import { useEffect, useState } from "react";
import { Form } from "../form/Form";
import { useForm } from "react-hook-form";
import { api } from "../../utils/Api";
import { ReactComponent as Basket } from '../../assets/icons/basket.svg';
import './style.scss';

export const Comment = ({ post, onSendReview, currentUser, onDeleteComment }) => {
    const [users, setUsers] = useState([]);
    const [commentsPost, setCommentsPost] = useState(post.comments ?? []);
    const [showForm, setShowForm] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({ mode: "onSubmit" });

    const sendReview = async (data) => {
        try {
            const newPost = await api.addComment(post._id, { text: data.comment })
            onSendReview(newPost);
            setCommentsPost(state => [...newPost.comments])
            setShowForm(false);
            reset();
            alert('отзыв создан')
        } catch (error) {
            alert('ошибка')
        }
    }

    useEffect(() => {
        api.getUsers().then((data) => {
            setUsers(data)})
        
    }, []);

    const deleteComment = async (id) => {
        try {
            const res = await onDeleteComment(id);
            alert("отзыв удален")
            setCommentsPost(() => [...res.comments])
        } catch (error) {
            alert('ошибка удаления')
        }
    }

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }

    const textRegister = register("comment", {
        required: "Комментарий обязателен",
    });

    return (
        <div className="comments">
            <div className="comments__input">
                {!showForm ?
                    <button className='btn btn__type__primary' onClick={() => setShowForm(true)}>Добавить Отзыв</button> :
                    <button className="btn btn__type__primary" onClick={() => setShowForm(false)}>Отмена</button>
                }
                {showForm && <div>
                    <Form className='comments__input__form' submitForm={handleSubmit(sendReview)}>
                        <span className="comments__input__form__text">Оставьте ваш отзыв</span>
                        <textarea
                            placeholder="Ваш отзыв"
                            className="comments__input__form__type"
                            {...textRegister}
                        />
                        <button className="btn btn__type__primary" type="submit">Оставить отзыв</button>
                    </Form>
                </div>}
            </div>
            {users && commentsPost
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((r) =>
                    <div className="posted__comment" key={r._id} >
                        <div className="posted__comment__title">
                            <div className="posted__comment__author">
                                <img src={r.author?.avatar} alt="ava" className="author__ava" />
                                <span className="posted__comment__title__name">{r.author?.name}</span>
                            </div>
                            <span className="posted__comment__title__date">{new Date(r.created_at).toLocaleString('ru', options)}</span>
                        </div>
                        <div className="posted__comment__content">
                            <span>
                                {r.text}
                            </span>
                            {currentUser?._id === r.author._id &&
                                <Basket onClick={() => deleteComment(r._id)} />
                            }
                        </div>
                    </div>)}
        </div>);
}