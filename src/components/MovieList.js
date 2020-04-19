import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { selectAllMovies } from '../reducers/moviesSlice';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    maxWidth: 440,
  },
}));

function MovieList({ loading }) {
  const classes = useStyles();
  const movies = useSelector(selectAllMovies);
  const skeletonsArray = [1, 2, 3, 4];

  if (loading) {
    return (
      <Grid container spacing={4} justify="center" className={classes.container}>
        {skeletonsArray.map(i => (
          <Grid item key={i} xs={12} md={6} className={classes.card}>
            <MovieCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={4} justify="center" className={classes.container}>
      <Grid item xs={12} md={6} className={classes.card}>
        <MovieCardSkeleton />
      </Grid>
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

MovieList.propTypes = {
  loading: PropTypes.bool,
};

MovieList.defaultProps = {
  loading: false,
};

export default MovieList;
