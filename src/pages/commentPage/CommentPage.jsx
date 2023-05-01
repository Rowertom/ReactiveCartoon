import { useSelector } from "react-redux";
import { AllCommentsList } from "../../components/allCommentsList/AllCommensList";
import { CommentsSort } from "../../components/commentsSort/CommentsSort";
import { useNavigate } from "react-router-dom";
import './style.scss';


export const CommentPage = () => {

    const comments = useSelector(s => s.allComments.shownComments);
    const navigate = useNavigate();


    return (
        <>
        <button className='btn__comment btn__type__primary' onClick={() => navigate(-1)}>{'< '}Назад</button>
            <CommentsSort />
            <AllCommentsList comments={comments}/>
        </>
    )
}