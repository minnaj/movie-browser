import React from 'react';
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

function SearchHeader() {
  const classes = useStyles();

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

export default SearchHeader;
