import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';

export const store = configureStore({
    reducer: {
        user: authReducer
        },
        // devTools: process.env.NODE_ENV !== 'production',
})