import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import themeReducer from '../store/themeSlice';
import technicianReducer from '../store/technicianSlice';

export const store = configureStore({
    reducer: {
        user: authReducer,
        theme: themeReducer,
        technician: technicianReducer,
        },
        // devTools: process.env.NODE_ENV !== 'production',
})