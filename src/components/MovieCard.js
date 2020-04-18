import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TvIcon from '@material-ui/icons/Tv';
import DvrIcon from '@material-ui/icons/Dvr';
import TheatersIcon from '@material-ui/icons/Theaters';
import ImageIcon from '@material-ui/icons/Image';

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
  iconContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

function MovieCard({
  title,
  year,
  posterUrl,
  type,
}) {
  const classes = useStyles();

  return (
    <Card raised>
      <div className={classes.titleContainer}>
        {!posterUrl || posterUrl !== 'N/A' ? (
          <img
            src={posterUrl}
            alt="movie poster"
            width="100%"
            height="100%"
            className={classes.poster}
          />
        ) : (
          <div className={classes.iconContainer}>
            <ImageIcon fontSize="large" color="disabled" />
          </div>
        )}
        <div className={classes.titleOverlay}>
          <div>
            <Typography color="textPrimary" className={classes.title}>
              {title}
            </Typography>
          </div>
        </div>
      </div>
      <CardContent>
        <div className={classes.content}>
          <div>
            <Typography color="textPrimary">
              {year}
            </Typography>
          </div>
          <div>
            {type === 'movie' && (
              <TheatersIcon className={classes.typeIcon} />
            )}
            {type === 'series' && (
              <TvIcon className={classes.typeIcon}/>
            )}
            {type === 'episode' && (
              <DvrIcon className={classes.typeIcon}/>
            )}
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">Read more</Button>
      </CardActions>
    </Card>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string,
  posterUrl: PropTypes.string,
  type: PropTypes.string,
};

export default MovieCard;
