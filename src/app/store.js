import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/User/userSlice';
import adminReducer from '../features/User/adminSlice';
import adminsReducer from '../features/User/admins_slice';

export const store = configureStore({
  reducer: {

    user:userReducer,
    admin:adminReducer,
    admins:adminsReducer,
  },
});
