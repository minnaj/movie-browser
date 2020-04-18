import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { fetchMovies } from '../reducers/moviesSlice';
import MovieList from '../components/MovieList';
import SearchHeader from '../components/SearchHeader';
import CircularProgress from '../components/CircularProgress';
import Pagination from './Pagination';

function HomeContainer() {
  const moviesLoading = useSelector(state => state.movies.loading);
  const moviesError = useSelector(state => state.movies.error);
  const moviesCount = useSelector(state => state.movies.totalResults);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(moviesCount / 10);

  useEffect(() => {
    if (query.length > 2) {
      dispatch(fetchMovies({ title: query }));
    }
  }, [dispatch, query]);

  return (
    <Container maxWidth="md">
      <SearchHeader value={query} onChange={value => setQuery(value)} />

      {moviesLoading && <CircularProgress />}

      {!moviesLoading && moviesError && (
        <Typography color="error" align="center">{moviesError}</Typography>
      )}

      {!moviesLoading && !moviesError && query !== '' && (
        <>
          <Pagination page={page} count={totalPages} onChange={setPage} />
          <Typography align="center" gutterBottom>{`Found ${moviesCount} results`}</Typography>
          <MovieList />
        </>
      )}
    </Container>
  );
}

export default HomeContainer;
