
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { filterCards, findLike } from "../../utils/utils";

//action по загрузке карточек
export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async function (
        data,
        { extra, fulfillWithValue, rejectWithValue, getState }
    ) {
        try {
            const { user } = getState();
            const cards = await extra.getAllPosts();
            return fulfillWithValue({ cards: cards, user: user.data });
        } catch (error) {
            return rejectWithValue(error);
        }
    });

// action по лайку карточек
export const fetchChangePostLike = createAsyncThunk(
    'cards/fetchChangePostLike',
    async function (
        post,
        { rejectWithValue, fulfillWithValue, getState, extra }
    ) {
        try {
            const { user } = getState();
            const wasLiked = findLike(post, user.data);
            const data = await extra.changeLikePostStatus(post._id, wasLiked);
            return fulfillWithValue({ post: data, wasLiked: wasLiked });
        } catch (error) {
            return rejectWithValue(error)
        }
    });

// action по удалению карточки
export const fetchDeletePost = createAsyncThunk(
    'cards/fetchDeletePost',
    async function (
        post,
        { rejectWithValue, fulfillWithValue, extra }
    ) {
        try {
            const data = await extra.deletePost(post._id);
            return fulfillWithValue({ post: data });
        } catch (error) {
            return rejectWithValue(error)
        }
    });

//объявление изначального стейта
const initialState = {
    posts: [],
    favourites: [],
    loading: false,
    error: null,
}

//создание слайса глобального стейта
const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCards.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            const { cards, user } = action.payload
            state.posts = filterCards(cards);
            state.favourites = cards.filter((e) => findLike(e, user));
            state.loading = false;
        })
        builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
            const { post } = action.payload
            state.loading = false;
            state.posts = state.posts.filter((el) => el._id !== post._id);
        })
        builder.addCase(fetchChangePostLike.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const { post, wasLiked } = action.payload;
            state.posts = state.posts.map(card => {
                return card._id === post._id ? post : card;
            })
            if (!wasLiked) {
                state.favourites.push(post);
            } else {
                state.favourites = state.favourites.filter(cardFav => cardFav._id !== post._id);
            }
        })
    }
})

export default cardsSlice.reducer;