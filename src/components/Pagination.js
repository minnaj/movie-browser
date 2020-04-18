import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

const PAGE_BOUNDARY = 3;

function Pagination({ page, count, onChange }) {
  const pagesStartIndex = page > PAGE_BOUNDARY ? page - PAGE_BOUNDARY : 0;
  const pagesEndIndex = count - 1 - page > PAGE_BOUNDARY ? page + PAGE_BOUNDARY : count - 1;

  const pagesRange = pagesEndIndex - pagesStartIndex + 1;
  const displayedPages = Array.from({ length: pagesRange }, (_, i) => pagesStartIndex + i);

  return (
    <Grid container spacing={1} justify="center" alignItems="flex-end">
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={page === 0 ? () => {} : () => onChange(0)}
          disabled={page === 0}
        >
          <FirstPageIcon size="small" />
        </Button>
      </Grid>
      {pagesStartIndex > 0 && (
        <Grid item>
          …
        </Grid>
      )}
      {displayedPages.map(displayedPage => (
        <Grid item key={displayedPage}>
          <Button
            size="small"
            variant={page === displayedPage ? "contained" : "outlined"}
            color="secondary"
            onClick={page === displayedPage ? () => {} : () => onChange(displayedPage)}
          >
            {displayedPage + 1}
          </Button>
        </Grid>
      ))}
      {pagesEndIndex + 1 < count && (
        <Grid item>
          …
        </Grid>
      )}
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={page === count - 1 ? () => {} : () => onChange(count - 1)}
          disabled={page === count - 1}
        >
          <LastPageIcon size="small" />
        </Button>
      </Grid>
    </Grid>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  count: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  page: 0,
};

export default Pagination;
