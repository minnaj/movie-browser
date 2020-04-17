import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { fetchMovies } from '../reducers/moviesSlice';
import MovieList from '../components/MovieList';
import SearchHeader from '../components/SearchHeader';

const useStyles = makeStyles(() => ({
  container: {
    background: 'linear-gradient(#25172D, #100a13) fixed',
    height: '100%',
    overflowY: 'auto',
  },
}));

function App() {
  const classes = useStyles();
  const moviesLoading = useSelector(state => state.movies.loading);
  const moviesError = useSelector(state => state.movies.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (moviesLoading) {
    return (
      <div className={classes.container}>
        <Container maxWidth="md">
          <SearchHeader />
          <div>Loading...</div>
        </Container>
      </div>
    );
  }
  if (moviesError) {
    return (
      <div className={classes.container}>
        <Container maxWidth="md">
          <SearchHeader />
          <div>Error encountered</div>
        </Container>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Container maxWidth="md">
        <SearchHeader />
        <MovieList />
      </Container>
    </div>
  );
}

export default App;
