import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { searchMovies } from '../app/api';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMoviesStatus',
  async ({ title, year, type, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await searchMovies(title, year, type, page);
      if (response.Response === "False") {
        return rejectWithValue(response.Error);
      }
      return {
        ...response,
        page,
      };
    } catch (err) {
      return rejectWithValue('Search failed');
    }
  },
);

export const moviesAdapter = createEntityAdapter({
  selectId: movie => movie.imdbID,
});

// By default, `createEntityAdapter` gives you `{ ids: [], entities: {} }`.
// If you want to track 'loading' or other keys, you would initialize them here:
// `getInitialState({ loading: false, activeRequestId: null })`
const initialState = moviesAdapter.getInitialState({
  query: '',
  loading: false,
  error: null,
  totalResults: 0,
  page: 1,
  favorites: [],
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite: (state, { payload }) => {
      const favorites = state.favorites.slice(0);
      const index = state.favorites.findIndex(item => item === payload);
      if (index === -1) {
        state.favorites = favorites.concat(payload);
      } else if (index === 0) {
        state.favorites = favorites.slice(1);
      } else if (index === state.favorites.length - 1) {
        state.favorites = favorites.slice(0, -1);
      } else if (index > 0) {
        state.favorites = [
          ...favorites.slice(0, index),
          ...favorites.slice(index + 1),
        ];
      }
    },
  },
  extraReducers: {
    [fetchMovies.pending]: (state, { meta }) => {
      state.query = meta.arg.title;
      state.page = meta.arg.page;
      state.loading = true;
    },
    [fetchMovies.fulfilled]: (state, { payload }) => {
      moviesAdapter.setAll(state, payload.Search);
      state.totalResults = payload.totalResults;
      state.loading = false;
      state.page = payload.page;
    },
    [fetchMovies.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { toggleFavorite } = moviesSlice.actions;

export default moviesSlice.reducer;

export const {
  selectById: selectMovieById,
  selectIds: selectMovieIds,
  selectEntities: selectMovieEntities,
  selectAll: selectAllMovies,
  selectTotal: selectTotalMovies,
} = moviesAdapter.getSelectors(state => state.movies);
