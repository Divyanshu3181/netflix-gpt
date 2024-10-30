import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        showMovieSearch: false,
        movieResult: null,
    },
    reducers: {
        toggleSearchView: (state, action) => {
            state.showMovieSearch = !state.showMovieSearch;
        },
        addSearchMovieResult: (state, action) => {
            state.movieResult = action.payload;
        }
    }
});

export const {toggleSearchView, addSearchMovieResult} = searchSlice.actions;
export default searchSlice.reducer;