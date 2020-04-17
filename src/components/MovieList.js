import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TvIcon from '@material-ui/icons/Tv';
import TheatersIcon from '@material-ui/icons/Theaters';
import { selectAllMovies } from '../reducers/moviesSlice';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.main,
    textShadow: '0px 2px 10px #FE6B8B',
    fontSize: '1.5rem',
  },
  titleContainer: {
    position: "relative",
    width: "100%",
    height: 400,
  },
  titleOverlay: {
    position: "absolute",
    bottom: 0,
    top: 0,
    width: "100%",
    background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.95))",
    display: "flex",
    alignItems: "flex-end",
    "& > div": {
      padding: 10,
    },
  },
  poster: {
    objectFit: "cover",
  },
  content: {
    display: "flex",
    "& > div:first-child": {
      flex: 1,
    },
  },
  typeIcon: {
    color: theme.palette.secondary.main,
  },
}));

function App() {
  const classes = useStyles();
  const movies = useSelector(selectAllMovies);

  return (
    <Grid container spacing={4}>
      {movies.map(movie => (
        <Grid item key={movie.imdbID} xs={12} md={6}>
          <Card raised>
            <div className={classes.titleContainer}>
              <img
                src={movie.Poster}
                alt="movie poster"
                width="100%"
                height="100%"
                className={classes.poster}
              />
              <div className={classes.titleOverlay}>
                <div>
                  <Typography color="textPrimary" className={classes.title}>
                    {movie.Title}
                  </Typography>
                </div>
              </div>
            </div>
            <CardContent>
              <div className={classes.content}>
                <div>
                  <Typography color="textPrimary">
                    {movie.Year}
                  </Typography>
                </div>
                <div>
                  {movie.Type === 'movie' && (
                    <TheatersIcon className={classes.typeIcon} />
                  )}
                  {movie.Type === 'series' && (
                    <TvIcon  className={classes.typeIcon}/>
                  )}
                </div>
              </div>
            </CardContent>
            <CardActions>
              <Button>Read more</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default App;
