import { CommentCard } from "../commentCard/commentCard";
import './style.scss';


export const AllCommentsList = ({comments}) => {

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }


    return (
        <div className="commentCards">
            {comments.map((r) => {
                return <CommentCard {...r}
                    key={r._id}
                    date={new Date(r.created_at).toLocaleString('ru', options)}
                />
            })}
        </div>
    )
}