import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name:"image",
    initialState: "",
    reducers: {
        setImage(state, action){
            state = action.payload;
            return state;
        }
    }
});
export const {setImage } = imageSlice.actions;

export default imageSlice.reducer;