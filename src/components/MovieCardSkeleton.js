import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import ImageIcon from '@material-ui/icons/Image';

const CARD_CONTENT_HEIGHT = 62;
const CARD_ACTIONS_HEIGHT = 52.5;

const useStyles = makeStyles(() => ({
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
  iconContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContentRoot: {
    height: CARD_CONTENT_HEIGHT + CARD_ACTIONS_HEIGHT,
  },
}));

function MovieCardSkeleton() {
  const classes = useStyles();

  return (
    <Fade in>
      <Card raised>
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

export default MovieCardSkeleton;
