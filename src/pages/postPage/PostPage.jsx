import { useParams } from "react-router-dom"
import { Post } from "../../components/post/Post"
import { useEffect, useState } from "react";
import { api } from "../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { findLike } from "../../utils/utils";
import { fetchChangePostLike } from "../../storage/cardsSlice/cardsSlice";

export const PostPage = () => {
    const id = useParams();
    const [post, setPost] = useState(null);

    const currentUser = useSelector(s => s.user.data);
    const dispatch = useDispatch();

    const onPostLike = () => {
        const wasLiked = findLike(post, currentUser);
        dispatch(fetchChangePostLike(post));
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
        />
        : <div>Loading</div>
    )
};