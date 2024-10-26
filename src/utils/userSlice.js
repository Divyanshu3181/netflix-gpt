import { createSlice } from "@reduxjs/toolkit";


const userlice = createSlice ({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        },
    },
});

export const {addUser,removeUser} = userlice.actions;
export default userlice.reducer;