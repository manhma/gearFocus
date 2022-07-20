import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    role: {},
    country: [],
};

const userManageSlice = createSlice({
    name: 'userManage',
    initialState: initialState,
    reducers: {
        addRole(state, action) {
            state.role = action.payload;
        },
        addCountry(state, action) {
            state.country = action.payload;
        },
    },
});

export const { addRole, addCountry } = userManageSlice.actions;

export default userManageSlice.reducer;
