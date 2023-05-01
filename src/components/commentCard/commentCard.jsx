import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './style.scss'


export const CommentCard = ({ post, author, date, text }) => {

    const cards = useSelector(s => s.cards.data);

    let image = '';

    cards.forEach(element => {
        if (element._id === post) {
            image = element.image;
        }

    });

    return (
        <div>
            <Link to={`/post/${post}`}>
                <div className="commentBox">
                    <div className="commentBox__imageBox">
                        <img className="commentBox__imageBox__img" src={image} alt="img_error" />
                    </div>
                    <div className="commentBox__contentBox">
                        <div className="posted__comment__title">
                            <div className="posted__comment__author">
                                <img src={author?.avatar} alt="ava" className="author__ava" />
                                <span className="posted__comment__title__name">{author?.name}</span>
                            </div>
                            <span className="posted__comment__title__date">{date}</span>
                        </div>
                        <div className="posted__comment__content">
                            <span>
                                {text}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}