import { useParams } from "react-router-dom"
import { Post } from "../../components/post/Post"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../storage/postSlice/postSlice";

export const PostPage = () => {
    const id = useParams();

    const currentUser = useSelector(s => s.user.data);
    const post = useSelector(s => s.post.post);
    const dispatch = useDispatch();

    //получение поста по id
    useEffect(() => {
        if (!id?.postId) return;
        dispatch(fetchPost(id?.postId))
    }, [id?.postId]);

    return (post && currentUser ?
        <Post post = {post}/>
        : <div>Loading</div>
    )
};