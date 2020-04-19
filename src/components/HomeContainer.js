import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { fetchMovies } from '../reducers/moviesSlice';
import MovieList from '../components/MovieList';
import SearchHeader from '../components/SearchHeader';
import Pagination from './Pagination';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 30,
  },
  infoContainer: {
    height: 50,
  },
}));

function HomeContainer() {
  const classes = useStyles();
  const moviesLoading = useSelector(state => state.movies.loading);
  const moviesError = useSelector(state => state.movies.error);
  const moviesCount = useSelector(state => state.movies.totalResults);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(moviesCount / 10);

  useEffect(() => {
    if (query.length > 2) {
      dispatch(fetchMovies({ title: query, page: page + 1 }));
    }
  }, [dispatch, query, page]);

  const handleQueryChange = newQuery => {
    setQuery(newQuery);
    setPage(0);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SearchHeader
            value={query}
            onChange={handleQueryChange}
            loading={moviesLoading}
          />
        </Grid>

        {!moviesLoading && moviesError && (
          <Grid item className={classes.infoContainer}>
            <Typography color="error" align="center">{moviesError}</Typography>
          </Grid>
        )}

        {!moviesLoading && !moviesError && query !== '' && (
          <Grid item className={classes.infoContainer}>
            <Typography align="center" gutterBottom>{`Found ${moviesCount} results`}</Typography>
          </Grid>
        )}

        {!moviesError && query !== '' && (
          <>
            <Grid item>
              <Pagination page={page} count={totalPages} onChange={setPage} />
            </Grid>
            <Grid item>
              <MovieList loading={moviesLoading} />
            </Grid>
            <Grid item>
              <Pagination page={page} count={totalPages} onChange={setPage} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default HomeContainer;
