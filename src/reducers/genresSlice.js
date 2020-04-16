import { createSlice } from '@reduxjs/toolkit';

const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    all: [],
    isFetching: false,
  },
  reducers: {
    fetchGenresStart(state) {
      state.isFetching = true;
    },
    fetchGenresSuccess(state, action) {
      state.isFetching = false;
    },
    fetchGenresFailure(state, action) {
      state.isFetching = false;
    },
  },
});

export const { fetchGenresStart, fetchGenresSuccess } = genresSlice.actions;

export default genresSlice.reducer;
