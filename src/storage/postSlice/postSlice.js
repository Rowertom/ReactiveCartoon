import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { sliceComments, sortComments } from "../../utils/utils";
import { toast } from "react-toastify";

//action по загрузке поста
export const fetchPost = createAsyncThunk(
    'post/fetchPost',
    async function (
        data,
        { extra, fulfillWithValue, rejectWithValue }
    ) {
        try {
            const post = await extra.getPostsById(data);
            return fulfillWithValue(post);
        } catch (error) {
            toast.error('Ошибка! Не удалось загрузить страницу поста')
            return rejectWithValue(error);
        }
    });

//action по добавления комментария
export const fetchCommentPost = createAsyncThunk(
    'post/fetchCommentPost',
    async function (
        comment,
        { extra, fulfillWithValue, rejectWithValue }
    ) {
        try {
            const post = await extra.addComment(comment.id, { text: comment.text })
            toast.success('Отзыв добавлен');
            return fulfillWithValue(post);
        } catch (error) {
            toast.error('Ошибка! Не удалось добавить отзыв');
            return rejectWithValue(error);
        }
    });

//action по удалению комментария
export const fetchDeleteComment = createAsyncThunk(
    'post/fetchDeleteComment',
    async function (
        id,
        { extra, fulfillWithValue, rejectWithValue }
    ) {
        try {
            const post = await extra.deleteComment(id.postId, id.commentId)
            toast.success('Отзыв удален');
            return fulfillWithValue(post);
        } catch (error) {
            toast.error('Ошибка! Не удалось удалить отзыв');
            return rejectWithValue(error);
        }
    });

const isError = (action) => {
    return action.type.endsWith('rejected');
};

//Объявление изначального стейта поста
const initialState = {
    post: [],
    comments: [],
    allComments: [],
    countComments: 2,
    loading: false,
    error: null,
}

//создание слайса глобального стейта поста
const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        //action лайка в посте
        setPostLike: (state, action) => {
            const { isLiked, currentUser } = action.payload;
            if (isLiked) {
                const filteredLikes = state.post?.likes.filter(e => e !== currentUser?._id);
                state.post = ({ ...state.post, likes: filteredLikes });
            } else {
                const addedLikes = [...state.post.likes, currentUser?._id];
                state.post = ({ ...state.post, likes: addedLikes });
            }
        },
        //action обновления поста без запроса на сервер
        updatedPost: (state, action) => {
            state.post = action.payload;
        },
        //action комментариев больше
        showMoreComments: (state, action) => {
            state.countComments = state.countComments + 2;
            state.comments = [...sliceComments(sortComments(state.post.comments), state.countComments)]
        },
        //action скрыть комментарии
        hideComments: (state, action) => {
            state.countComments = 0;
            state.comments = [];

        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.comments = [...sliceComments(sortComments(action.payload.comments), state.countComments)]
            state.post = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchCommentPost.fulfilled, (state, action) => {
            state.post = action.payload;
            state.comments = [...sliceComments(sortComments(action.payload.comments), state.countComments)];
            state.loading = false;
        })
        builder.addCase(fetchDeleteComment.fulfilled, (state, action) => {
            state.post = action.payload;
            state.comments = [...sliceComments(sortComments(action.payload.comments), state.countComments)];
            state.loading = false;
        })
        builder.addCase(isError, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            toast.error('Ошибка загрузки');
        });
    }
})

export const { setPostLike, updatedPost, hideComments, showMoreComments } = postSlice.actions;

export default postSlice.reducer;