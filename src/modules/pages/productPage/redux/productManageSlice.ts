import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    category: [],
};

const productManageSlice = createSlice({
    name: 'productManage',
    initialState: initialState,
    reducers: {
        addCategory(state, action) {
            state.category = action.payload;
        },
    },
});

export const { addCategory } = productManageSlice.actions;

export default productManageSlice.reducer;
