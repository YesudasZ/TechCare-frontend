import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import themeReducer from '../store/themeSlice';

export const store = configureStore({
    reducer: {
        user: authReducer,
        theme: themeReducer,

        },
        // devTools: process.env.NODE_ENV !== 'production',
})