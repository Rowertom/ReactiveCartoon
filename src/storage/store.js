import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice.js";
import { api } from "../utils/Api.js";
import cardsSlice from "./cardsSlice/cardsSlice.js";
import postSlice from "./postSlice/postSlice.js";
import modalSlice from "./modalSlice/modalSlice.js";
import allCommentsSlice from "./allCommentsSlice/allCommentsSlice.js";


const store = configureStore({
    reducer: {
        user: userSlice,
        cards: cardsSlice,
        post: postSlice,
        modal: modalSlice,
        allComments: allCommentsSlice,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware({
        thunk: {
            extraArgument: api,
        }
    }) 
});

export default store;