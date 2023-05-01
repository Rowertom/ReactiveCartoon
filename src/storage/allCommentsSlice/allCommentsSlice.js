import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import { sortComments } from "../../utils/utils";



//action по получению всех комментариев
export const fetchAllComments = createAsyncThunk(
    'post/fetchAllComments',
    async function (
        data,
        { extra, fulfillWithValue, rejectWithValue, getState }
    ) {
        try {
            const { cards } = getState();
            const comments = await extra.getAllComments();
            return fulfillWithValue({ comments: comments, cards: cards.data });
        } catch (error) {
            toast.error('Ошибка! Не удалось загрузить страницу комментариев')
            return rejectWithValue(error);
        }
    });

const initialState = {
    allComments: [],
    shownComments: [],
    countShownComments: 10,
}

const allCommentsSlice = createSlice({
    name: 'allComments',
    initialState: initialState,
    reducers: {
        //action по отображению количества комментариев
        setCountComments: (state, action) => {
            state.countShownComments = action.payload;
            state.shownComments = state?.allComments?.slice(0, action.payload);
        },
        //action по сортировке комментариев
        sortedAllComments: (state, action) => {
            switch (action.payload) {
                case 'comment':
                    state.allComments = state.allComments.sort((a, b) => {

                        if (a.author.name > b.author.name) {
                            return 1;
                        }
                        if (a.author.name < b.author.name) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case 'post':
                    state.allComments = state.allComments.sort((a, b) => {

                        if (a.post > b.post) {
                            return 1;
                        }
                        if (a.post < b.post) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                default:
                    state.allComments = state.allComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }
            state.shownComments = state.allComments.slice(0, state.countShownComments);
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchAllComments.fulfilled, (state, action) => {
            const { comments, cards } = action.payload;
            const idArr = [];
            cards.forEach(element => { idArr.push(element._id) });
            state.allComments = [...sortComments(comments.filter((e) => idArr.find((i) => i === e.post)))];
            state.shownComments = state.allComments.slice(0, state.countShownComments);
            state.loading = false;
        })
    }
})

export const { setCountComments, sortedAllComments } = allCommentsSlice.actions;
export default allCommentsSlice.reducer;