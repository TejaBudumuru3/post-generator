import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import linkedinPostReducer  from './slices/linkedinSlice';
import imageReducer from "./slices/imageSlice";


const store = configureStore({
    reducer:{
        user: userReducer,
        posts : postReducer,
        linkedinPost : linkedinPostReducer,
        image : imageReducer

    }
});

export default store