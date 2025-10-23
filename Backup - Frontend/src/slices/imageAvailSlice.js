import { createSlice } from "@reduxjs/toolkit";

const imageAvail = createSlice({
    name:"image-avail",
    initialState: false,
    reducers:{
        setImgAvail(state, action){
            state = action.payload
            return state
        },
        clearImgAvail(state){
            state = false
            return state
        }

    }
})

export const {setImgAvail, clearImgAvail } = imageAvail.actions;
export default imageAvail.reducer