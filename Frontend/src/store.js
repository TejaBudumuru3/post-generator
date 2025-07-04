import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import linkedinPostReducer  from './slices/linkedinSlice';
import imageReducer from "./slices/imageSlice";
import imgAvailReducer from "./slices/imageAvailSlice"


const store = configureStore({
    reducer:{
        user: userReducer,
        posts : postReducer,
        linkedinPost : linkedinPostReducer,
        image : imageReducer,
        imgAvail : imgAvailReducer

    }
});

export default store