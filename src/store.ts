// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/register/registerSlice';
import awarenessReducer from './features/dashboard/awarenessSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';


const store = configureStore({
  reducer: {
    register: registerReducer,
    awareness: awarenessReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
