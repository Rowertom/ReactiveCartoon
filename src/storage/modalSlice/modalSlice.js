import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    activeModal: false,
} 

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setShowModal: (state, action) => {
            state.activeModal = action.payload;
        }
    }
})

export const {setShowModal} = modalSlice.actions;

export default modalSlice.reducer;