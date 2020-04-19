import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '../components/CircularProgress';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;
const LOADING_SPINNER_SIZE = 30;

const useStyles = makeStyles(() => ({
  container: {
    height: 300,
  },
  loadingContainer: {
    width: LOADING_SPINNER_SIZE + 8,
    height: LOADING_SPINNER_SIZE + 8,
  },
}));

function SearchHeader({ value, onChange, loading }) {
  const classes = useStyles();
  const [query, setQuery] = useState(value);
  const queryRef = useRef(query);
  queryRef.current = query;
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleChange = (e) => {
    clearTimeout(timer.current);
    setQuery(e.target.value);
    timer.current = setTimeout(() => {
      onChange(queryRef.current);
    }, WAIT_INTERVAL);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      onChange(query);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
      className={classes.container}
    >
      <Grid item>
        <Typography variant="h3" color="primary">The Open Movie Database search</Typography>
      </Grid>
      <Grid item container alignItems="flex-end" justify="center" spacing={1}>
        <Grid item className={classes.loadingContainer} />
        <Grid item>
          <TextField
            id="search-textfield"
            label="Search for movies and series"
            color="secondary"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item className={classes.loadingContainer}>
          {loading && <CircularProgress size={LOADING_SPINNER_SIZE} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

SearchHeader.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

SearchHeader.defaultProps = {
  value: '',
  loading: false,
};

export default SearchHeader;
