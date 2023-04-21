import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice.js";
import { api } from "../utils/Api.js";
import cardsSlice from "./cardsSlice/cardsSlice.js";


const store = configureStore({
    reducer: {
        user: userSlice,
        cards: cardsSlice,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware({
        thunk: {
            extraArgument: api,
        }
    }) 
});

export default store;