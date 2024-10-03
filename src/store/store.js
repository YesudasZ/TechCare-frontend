import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../store/authSlice';
import themeReducer from '../store/themeSlice';
import technicianReducer from '../store/technicianSlice';
import notificationReducer from '../store/notificationSlice';

const presistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
}
const persistedReducer = persistReducer(presistConfig, authReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        theme: themeReducer,
        technician: technicianReducer,
        notifications: notificationReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck:{
                    ignoredActions: ['persist/PERSIST'],
                }
            })
        // devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store);