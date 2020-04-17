import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { fetchMovies } from '../reducers/moviesSlice';
import MovieList from '../components/MovieList';
import SearchHeader from '../components/SearchHeader';
import CircularProgress from '../components/CircularProgress';

function HomeContainer() {
  const moviesLoading = useSelector(state => state.movies.loading);
  const moviesError = useSelector(state => state.movies.error);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.length > 2) {
      dispatch(fetchMovies(query));
    }
  }, [dispatch, query]);

  return (
    <Container maxWidth="md">
      <SearchHeader value={query} onChange={value => setQuery(value)} />

      {moviesLoading && <CircularProgress />}

      {!moviesLoading && moviesError && (
        <Typography color="error" align="center">{moviesError}</Typography>
      )}

      {!moviesLoading && !moviesError && <MovieList />}
    </Container>
  );
}

export default HomeContainer;
