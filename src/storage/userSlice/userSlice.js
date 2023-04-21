import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// async action получаем пользователя
export const fetchUser = createAsyncThunk(
    'user/fechUser', 
    async function (dataOutside, { fulfillWithValue, rejectWithValue, extra}) {
    try {
        const data = await extra.getUserInfo();
        return fulfillWithValue(data);
    } catch (error) {
        return rejectWithValue(error);
    }
});

// async action обновляем данные пользователя или аватар
export const updateUser = createAsyncThunk(
    'user/updateUser', 
    async function (dataOutside, { fulfillWithValue, rejectWithValue, extra}) {
    try {
        const data = dataOutside.avatar ? 
        await extra.updateAvatar(dataOutside)
        : await extra.updateUserInfo(dataOutside);
        alert('Данные усешно изменены')
        return fulfillWithValue(data);
    } catch (error) {
        alert('Данные изменить не удалось')
        return rejectWithValue(error);
    }
});

const isError = (action) => {
    return action.type.endsWith('rejected');
};

//объявление изначельного стейта
const initialState = {
    data: {},
    loading: false,
    error: null,
};

//создание слайса глобального стейта
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(isError, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            alert('Ошибка загрузки');
        });
     }
});

export default userSlice.reducer;