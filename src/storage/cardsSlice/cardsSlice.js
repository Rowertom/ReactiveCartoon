
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { filterCards, findLike, slicePosts, sortCards } from "../../utils/utils";
import { toast } from "react-toastify";



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
            toast.error('Не удалось поставить лайк')
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
            toast.success('Пост удален')
            return fulfillWithValue({ post: data });
        } catch (error) {
            toast.error('Ошибка удаления поста')
            return rejectWithValue(error)
        }
    });

//action по созданию поста
export const fetchAddPost = createAsyncThunk(
    'cards/fetchAddPost',
    async function (
        post,
        { rejectWithValue, fulfillWithValue, extra }
    ) {
        try {
            const newPost = await extra.createPost(post);
            toast.success('Пост создан')
            return fulfillWithValue(newPost);
        } catch (error) {
            toast.error('Ошибка! Не удалось создать пост')
            return rejectWithValue(error)
        }
    });

//action обновления поста
export const fetchUpdatePost = createAsyncThunk(
    'cards/fetchUpdatePost',
    async function (
        post,
        { rejectWithValue, fulfillWithValue, extra }
    ) {
        try {
            const newPost = await extra.updatePost(post._id, post);
            toast.success('Данные поста обновлены')
            return fulfillWithValue(newPost);
        } catch (error) {
            toast.error('Ошибка! Не удалось обновить пост')
            return rejectWithValue(error)
        }
    });

//action по поиску постов
export const fetchSearchCards = createAsyncThunk(
    'cards/fetchSearchCards',
    async function (
        search,
        { extra, fulfillWithValue, rejectWithValue }
    ) {
        try {
            const cards = await extra.searchPosts(search);
            return fulfillWithValue(cards);
        } catch (error) {
            toast.error('Ошибка!')
            return rejectWithValue(error);
        }
    });

const isError = (action) => {
    return action.type.endsWith('rejected');
};

//объявление изначального стейта
const initialState = {
    data: [],
    posts: [],
    total: 0,
    favourites: [],
    page: 1,
    begin: 0,
    end: 6,
    pageSize: 6,
    loading: false,
    error: null,
}

//создание слайса глобального стейта
const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        //сортировка постов
        sortedCards: (state, action) => {
            state.data = sortCards(state.data, action.payload)
            state.posts = slicePosts(state.data, state.begin, state.end);
        },
        //смена страницы каталога
        setPage: (state, action) => {
            state.page = action.payload;
            state.begin = (state.page - 1) * state.pageSize;
            state.end = (state.page - 1) * state.pageSize + state.pageSize;
            state.posts = slicePosts(state.data, state.begin, state.end);
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchCards.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            const { cards, user } = action.payload
            state.data = filterCards(cards);
            state.total = state.data.length;
            state.posts = slicePosts(state?.data, state.begin, state.end);
            state.favourites = cards.filter((e) => findLike(e, user));
            state.loading = false;
        })
        builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
            const { post } = action.payload
            state.data = state.data.filter((el) => el._id !== post._id);
            state.total = state.data.length;
            state.posts = slicePosts(state.data, state.begin, state.end);
            state.loading = false;
        })
        builder.addCase(fetchChangePostLike.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const { post, wasLiked } = action.payload;
            state.data = state.data.map(card => {
                return card._id === post._id ? post : card;
            })
            state.posts = state.posts.map(card => {
                return card._id === post._id ? post : card;
            })
            if (!wasLiked) {
                state.favourites.push(post);
            } else {
                state.favourites = state.favourites.filter(cardFav => cardFav._id !== post._id);
            }
        })
        builder.addCase(fetchAddPost.fulfilled, (state, action) => {
            state.data = [action.payload, ...state.data];
            state.total = state.data.length;
            state.posts = slicePosts(state.data, state.begin, state.end);
            state.loading = false;
        })
        builder.addCase(fetchUpdatePost.fulfilled, (state, action) => {
            state.loading = false;
            let arr = [...state.data];
            const index = state.data.findIndex((e) => e._id === action?.payload?._id);
            arr.splice(index, 1, action?.payload);
            state.data = [...arr];
            state.posts = slicePosts(state.data, state.begin, state.end);
        })
        builder.addCase(fetchSearchCards.fulfilled, (state, action) => {
            state.data = filterCards(action.payload);
            state.total = state.data.length;
            state.posts = slicePosts(state.data, state.begin, state.end);
            state.loading = false;
        })
        builder.addCase(isError, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            toast.error('Ошибка загрузки');
        });
    }
})

export const { sortedCards, setPage } = cardsSlice.actions;

export default cardsSlice.reducer;