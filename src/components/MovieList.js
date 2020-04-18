import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { selectAllMovies } from '../reducers/moviesSlice';
import MovieCard from './MovieCard';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    maxWidth: 440,
  },
}));

function MovieList() {
  const classes = useStyles();
  const movies = useSelector(selectAllMovies);
  const moviesCount = useSelector(state => state.movies.totalResults);

  return (
    <Grid container spacing={4} justify="center" className={classes.container}>
      {movies.map(movie => (
        <Grid item key={movie.imdbID} xs={12} md={6} className={classes.card}>
          <MovieCard
            title={movie.Title}
            year={movie.Year}
            posterUrl={movie.Poster}
            type={movie.Type}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;
