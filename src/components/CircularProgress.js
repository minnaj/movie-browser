import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function CustomCircularProgress() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress color="secondary" />
    </div>
  );
}

export default CustomCircularProgress;
