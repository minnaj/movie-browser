import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import TvIcon from '@material-ui/icons/Tv';
import DvrIcon from '@material-ui/icons/Dvr';
import TheatersIcon from '@material-ui/icons/Theaters';
import ImageIcon from '@material-ui/icons/Image';
import FavoriteIcon from '@material-ui/icons/Favorite';

const CARD_CONTENT_HEIGHT = 62;
const CARD_ACTIONS_HEIGHT = 52.5;

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
  skeletonRoot: {
    backgroundColor: '#3e3c42',
  },
  cardContentRoot: {
    height: CARD_CONTENT_HEIGHT + CARD_ACTIONS_HEIGHT,
  },
  cardActionsRoot: {
    justifyContent: 'space-between',
  },
}));

function MovieCard({
  title,
  year,
  posterUrl,
  type,
  showSkeleton,
  isFavorite,
  onToggleFavorite,
}) {
  const classes = useStyles();

  if (showSkeleton) {
    return (
      <Fade in>
        <Card raised classes={{ root: classes.skeletonRoot }}>
          <div className={classes.titleContainer}>
            <div className={classes.iconContainer}>
              <ImageIcon fontSize="large" color="disabled" />
            </div>
            <div className={classes.titleOverlay}>
              <div />
            </div>
          </div>
          <CardContent classes={{ root: classes.cardContentRoot }} />
        </Card>
      </Fade>
    );
  }
  return (
    <Fade in>
      <Card raised>
        <div className={classes.titleContainer}>
          {!posterUrl || posterUrl !== 'N/A' ? (
            <Fade in>
              <img
                src={posterUrl}
                alt="movie poster"
                width="100%"
                height="100%"
                className={classes.poster}
              />
            </Fade>
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
        <CardActions classes={{ root: classes.cardActionsRoot }}>
          <IconButton aria-label="add to favorites" color={isFavorite ? 'primary' : 'default'} onClick={onToggleFavorite}>
            <FavoriteIcon />
          </IconButton>
          <Button variant="contained" color="primary">Read more</Button>
        </CardActions>
      </Card>
    </Fade>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string,
  posterUrl: PropTypes.string,
  type: PropTypes.string,
  showSkeleton: PropTypes.bool,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

MovieCard.defaultProps = {
  year: '',
  posterUrl: '',
  type: '',
  showSkeleton: false,
  isFavorite: false,
  onToggleFavorite: null,
};

export default MovieCard;
