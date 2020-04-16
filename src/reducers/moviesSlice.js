import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { searchMovies } from '../app/api';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMoviesStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await searchMovies('test');
      return response.Search;
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
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.loading = true;
    },
    [fetchMovies.fulfilled]: (state, action) => {
      moviesAdapter.upsertMany(state, action.payload);
      state.loading = false;
    },
    [fetchMovies.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.errorMessage;
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
