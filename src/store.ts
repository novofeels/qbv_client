// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/register/registerSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
