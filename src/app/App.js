import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, selectAllMovies } from '../reducers/moviesSlice';

function App() {
  const moviesLoading = useSelector(state => state.movies.loading);
  const moviesError = useSelector(state => state.movies.error);
  const movies = useSelector(selectAllMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (moviesLoading) {
    return (
      <div>Loading...</div>
    );
  }
  if (moviesError) {
    return (
      <div>Error encountered</div>
    );
  }

  return (
    <div>
      {movies.map(movie => (
        <div key={movie.imdbID}>{movie.Title}</div>
      ))}
    </div>
  );
}

export default App;
