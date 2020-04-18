import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const PAGE_BOUNDARY = 2;

function Ellipsis() {
  return (
    <Grid item>
      …
    </Grid>
  );
}

function Pagination({ page, count, onChange }) {
  const goToStart = useCallback(() => onChange(0), [onChange]);
  const goToEnd = useCallback(() => onChange(count - 1), [onChange, count]);

  const pagesStartIndex = page > PAGE_BOUNDARY ? page - PAGE_BOUNDARY : 0;
  const pagesEndIndex = count - 1 - page > PAGE_BOUNDARY ? page + PAGE_BOUNDARY : count - 1;

  const pagesRange = pagesEndIndex - pagesStartIndex + 1;
  const displayedPages = Array.from({ length: pagesRange }, (_, i) => pagesStartIndex + i);

  return (
    <Grid container spacing={1} justify="center" alignItems="flex-end">
      {pagesStartIndex > 0 && (
        <Grid item>
          <Button
            size="small"
            variant={"outlined"}
            color="secondary"
            onClick={goToStart}
          >
            1
          </Button>
        </Grid>
      )}
      {pagesStartIndex > 1 && <Ellipsis />}
      {displayedPages.map(displayedPage => (
        <Grid item key={displayedPage}>
          <Button
            size="small"
            variant={page === displayedPage ? "contained" : "outlined"}
            color="secondary"
            onClick={() => {
              if (page !== displayedPage) {
                onChange(displayedPage);
              }
            }}
          >
            {displayedPage + 1}
          </Button>
        </Grid>
      ))}
      {pagesEndIndex + 2 < count && <Ellipsis />}
      {pagesEndIndex + 1 < count && (
        <Grid item>
          <Button
            size="small"
            variant={"outlined"}
            color="secondary"
            onClick={goToEnd}
          >
            {count}
          </Button>
        </Grid>
      )}
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
