import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
  container: {
    height: 300,
  },
}));

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

function SearchHeader({ onChange }) {
  const classes = useStyles();
  const [query, setQuery] = useState('');
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
    </Grid>
  );
}

SearchHeader.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchHeader;
