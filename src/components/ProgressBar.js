import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(() => ({
  colorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#00695c',
  },
}));

function ProgressBar() {
  const classes = useStyles();

  return (
    <LinearProgress classes={{
      colorPrimary: classes.colorPrimary,
      barColorPrimary: classes.barColorPrimary,
    }} />
  );
}

export default ProgressBar;
