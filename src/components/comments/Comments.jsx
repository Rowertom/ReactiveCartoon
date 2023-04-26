import { useEffect, useState } from "react";
import { Form } from "../form/Form";
import { useForm } from "react-hook-form";
import { api } from "../../utils/Api";
import { ReactComponent as Basket } from '../../assets/icons/basket.svg';
import './style.scss';
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentPost, fetchDeleteComment, hideComments, showMoreComments } from "../../storage/postSlice/postSlice";

export const Comment = ({ post }) => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const dispatch = useDispatch();

    const currentUser = useSelector(s => s.user.data);
    const comments = useSelector(s => s.post.comments);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({ mode: "onSubmit" });

    //создание комментария
    const sendReview = async (data) => {
        await dispatch(fetchCommentPost({ id: post?._id, text: data.comment }));
        setShowForm(false);
        reset();
    }

    //получение всех юзеров
    useEffect(() => {
        api.getUsers().then((data) => {
            setUsers(data)
        })
    }, []);

    //удаление комментария
    const deleteComment = async (id) => {
        await dispatch(fetchDeleteComment({ postId: post._id, commentId: id }));
    }

    //показать больше комментариев
    function handleClickMoreComments() {
        dispatch(showMoreComments());
    }

    //скрыть комментарии
    function handleClickHideComments() {
        dispatch(hideComments());
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
            {users && comments
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
                                <Basket onClick={() => deleteComment(r._id)} className="comments__basket" />
                            }
                        </div>
                    </div>)}
            {post?.comments?.length ?
                <div className="countComments">
                    {!comments.length || post?.comments?.length !== comments?.length ?
                        <span className="countComments__more" onClick={() => handleClickMoreComments()}>Показать больше</span>
                        : ''
                    }
                    {comments?.length !== 0 ?
                        <span className="countComments__hide" onClick={() => handleClickHideComments()}>Скрыть комментарии</span>
                        : ''
                    }
                </div>
                : ''
            }
        </div>);
}