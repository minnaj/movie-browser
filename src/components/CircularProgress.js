import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function CustomCircularProgress({ size }) {
  const classes = useStyles();

  return (
    <Fade in>
      <div className={classes.container}>
        <CircularProgress color="secondary" size={size} />
      </div>
    </Fade>
  );
}

CustomCircularProgress.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CustomCircularProgress.defaultProps = {
  size: 40,
};

export default CustomCircularProgress;
