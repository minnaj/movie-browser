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
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
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
  loading: false,
  error: null,
  totalResults: 0,
  page: 1,
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.loading = true;
    },
    [fetchMovies.fulfilled]: (state, { payload }) => {
      moviesAdapter.upsertMany(state, payload.Search);
      state.totalResults = payload.totalResults;
      state.loading = false;
      state.page = payload.page;
    },
    [fetchMovies.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export default moviesSlice.reducer;

export const {
  selectById: selectMovieById,
  selectIds: selectMovieIds,
  selectEntities: selectMovieEntities,
  selectAll: selectAllMovies,
  selectTotal: selectTotalMovies,
} = moviesAdapter.getSelectors(state => state.movies);
