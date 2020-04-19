import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { selectAllMovies } from '../reducers/moviesSlice';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

const SKELETON_CARD_COUNT = 4;

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    maxWidth: 440,
  },
}));

function MovieList({ loading, page, pageCount, onPageChange }) {
  const classes = useStyles();
  const movies = useSelector(selectAllMovies);

  // Display either skeletons or actual content as the first cards
  const topCards = [];

  for (let i = 0; i < SKELETON_CARD_COUNT; i++) {
    if (loading || movies.length > i) {
      topCards.push(
        <Grid item key={i} xs={12} md={6} className={classes.card}>
          <MovieCard
            showSkeleton={loading}
            title={loading ? '' : movies[i].Title}
            year={loading ? '' : movies[i].Year}
            posterUrl={loading ? '' : movies[i].Poster}
            type={loading ? '' : movies[i].Type}
          />
        </Grid>,
      );
    }
  }

  return (
    <Grid container spacing={4} justify="center" className={classes.container}>
      <Grid item xs={12}>
        <Pagination page={page} count={pageCount} onChange={onPageChange} />
      </Grid>
      {topCards}
      {movies.length > SKELETON_CARD_COUNT && movies.slice(SKELETON_CARD_COUNT).map(movie => (
        <Grid item key={movie.imdbID} xs={12} md={6} className={classes.card}>
          <MovieCard
            title={movie.Title}
            year={movie.Year}
            posterUrl={movie.Poster}
            type={movie.Type}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Pagination page={page} count={pageCount} onChange={onPageChange} />
      </Grid>
    </Grid>
  );
}

MovieList.propTypes = {
  loading: PropTypes.bool,
  page: PropTypes.number,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

MovieList.defaultProps = {
  loading: false,
  page: 0,
};

export default MovieList;
