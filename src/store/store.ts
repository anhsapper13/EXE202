import userSlice from './slices/userSlice'
import loadingSlice from './slices/loadingSlice';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import themeSlice from './slices/themeSlice';
export const store = configureStore({
    reducer: {
        user: userSlice,
        theme: themeSlice.reducer,
        loading: loadingSlice
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;