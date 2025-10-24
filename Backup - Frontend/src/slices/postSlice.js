import { createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

const postSlice = createSlice({
    name: "post",
    initialState: {item:[]},
    reducers: {
        setPost(state,action){
            state.item = action.payload;
        },

        clearPost(state){
            state.item = [];
        }
    }
});

export const {setPost, clearPost} = postSlice.actions
export default postSlice.reducer;
