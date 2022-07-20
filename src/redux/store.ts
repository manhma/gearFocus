import { configureStore } from '@reduxjs/toolkit';
import productManageSlice from '../modules/pages/productPage/redux/productManageSlice';
import userManageSlice from '../modules/pages/userPage/redux/userManageSlice';

const store = configureStore({
    reducer: {
        userManage: userManageSlice,
        productManage: productManageSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
