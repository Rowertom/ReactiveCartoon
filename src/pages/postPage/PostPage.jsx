import { useParams } from "react-router-dom"
import { Post } from "../../components/post/Post"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { CardContext } from "../../context/CardContext";
import { api } from "../../utils/Api";

export const PostPage = () => {
    const id = useParams();
    const [post, setPost] = useState(null);

    const { currentUser } = useContext(UserContext);
    const { handlePostLike } = useContext(CardContext);

    const onPostLike = () => {
        const wasLiked = handlePostLike(post);
        if (wasLiked) {
            const filteredLikes = post?.likes.filter(e => e !== currentUser._id);
            setPost({ ...post, likes: filteredLikes });
        } else {
            const addedLikes = [...post.likes, currentUser._id];
            setPost({ ...post, likes: addedLikes });
        }
    }

    const onSendReview = (newPost) => {
        setPost(() => ({ ...newPost }));
    }

    const deleteComment = async (id) => {
        const result = await api.deleteComment(post._id, id);
        setPost(state => ({ ...result }));
        return result;
    }

    useEffect(() => {
        if (!id?.postId) return
        api.getPostsById(id?.postId).then((data) => setPost(data));
    }, [id?.postId]);

    return (post && currentUser ?
        <Post
            id={id.postId}
            post={post}
            onSendReview={onSendReview}
            onDeleteComment={deleteComment}
            onPostLike={onPostLike}
            currentUser={currentUser}
        />
        : <div>Loading</div>
    )
};