import { createSlice } from "@reduxjs/toolkit";

const linkedinSlice = createSlice({
    name: "linkedinPosts",
    initialState: "",
   reducers:{
        setLinkedinPost(state, action){
            state = action.payload;
            return state;
        },
        clearLinkedinPost(state){
            state = ""
            return state
        }

   }

});

export const{ setLinkedinPost, clearLinkedinPost } = linkedinSlice.actions;
export default linkedinSlice.reducer;