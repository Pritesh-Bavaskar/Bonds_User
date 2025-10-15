import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Stack,
  Container,
  Grid,
  Pagination,
  PaginationItem,
  Skeleton,
  Alert,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import BondLibraryCardList from '../../components/bond-library-card/bond-library-card-list';
import BondLibraryCardGrid from '../../components/bond-library-card/bond-library-card-grid';
import BondLibraryFilterCriteria from './bond-library-filter-criteria';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// Skeleton Loader Component
const BondCardSkeleton = ({ view }) => (
  <Grid
    item
    xs={12}
    sm={view === 'grid' ? 6 : 12}
    md={view === 'grid' ? 4 : 12}
    lg={view === 'grid' ? 4 : 12}
  >
    <Skeleton variant="rounded" width="100%" height={view === 'grid' ? 400 : 180} />
  </Grid>
);

BondCardSkeleton.propTypes = {
  view: PropTypes.oneOf(['grid', 'list']),
};

export default function BondLibraryList({
  bonds = [],
  loading = false,
  error = null,
  empty = false,
  page = 1,
  pageSize = 10,
  totalItems = 0,
  totalPages = 1,
  onPageChange = () => {},
  onPageSizeChange = () => {},
}) {
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');

  const handleChangeView = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    onPageChange(event, newPage);
  };

  const handlePageSizeChange = (event) => {
    onPageSizeChange(event);
  };

  // Show loading skeleton
  if (loading && bonds.length === 0) {
    return (
      <Container sx={{ py: 5 }}>
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <BondCardSkeleton key={index} view={view} />
          ))}
        </Grid>
      </Container>
    );
  }

  // Show error message
  if (error) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading bonds: {error.message || 'Unknown error occurred'}
        </Alert>
      </Container>
    );
  }

  // Show empty state
  if (empty) {
    return (
      <Container sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No bonds found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Stack spacing={4}>
        {/* Search and Filter Bar */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          spacing={2.5}
          sx={{ mb: 4 }}
        >
          <TextField
            placeholder="Search Issuer, ISIN, Security Name"
            variant="outlined"
            sx={{
              width: { xs: 1, sm: 400 },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                '& fieldset': {
                  borderColor: 'primary.main',
                  borderRadius: 999,
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Items per page' }}
              >
                {[10, 20, 50, 100].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size} per page
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, md: 4 }}
            alignItems={{ xs: 'stretch', md: 'center' }}
            sx={{ width: { xs: 1, md: 'auto' } }}
            display={{ xs: 'none', md: 'flex' }}
          >
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleChangeView}
              aria-label="view mode"
              size="small"
              sx={{
                bgcolor: 'transparent',
                border: 'none',
                borderColor: 'divider',
                borderRadius: 2,
                p: 0.5,
                '& .MuiToggleButton-root': {
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'common.white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                  '&:not(:first-of-type)': {
                    marginLeft: 0.5,
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                  },
                },
              }}
            >
              <ToggleButton value="grid" aria-label="grid view" sx={{ px: 2, gap: 1 }}>
                <Iconify icon="eva:grid-fill" width={20} height={20} />
                <span>Grid View</span>
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view" sx={{ px: 2, gap: 1 }}>
                <Iconify icon="eva:list-fill" width={20} height={20} />
                <span>List View</span>
              </ToggleButton>
            </ToggleButtonGroup>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
              <Select
                value={sortBy}
                onChange={handleSortBy}
                displayEmpty
                inputProps={{ 'aria-label': 'Sort by' }}
                sx={{
                  '& .MuiSelect-select': {
                    py: 1,
                    pr: 4,
                    pl: 2,
                  },
                }}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Left Sidebar (Filter Criteria) */}
          <Grid item xs={12} md={3} lg={3}>
            {/* Replace with your filter component */}
            <BondLibraryFilterCriteria />
          </Grid>

          {/* Right Content (Bond Cards) */}
          <Grid item xs={12} md={9} lg={9}>
            <Grid container spacing={3}>
              {bonds?.map((bond) => (
                <Grid
                  key={bond.isin_code}
                  item
                  xs={12}
                  sm={view === 'grid' ? 6 : 12}
                  md={view === 'grid' ? 4 : 12}
                  lg={view === 'grid' ? 4 : 12}
                >
                  {view === 'grid' || isMobile ? (
                    <BondLibraryCardGrid item={bond} />
                  ) : (
                    <BondLibraryCardList item={bond} />
                  )}
                </Grid>
              ))}

              {/* Show loading indicator when loading more items */}
              {loading && bonds.length > 0 && (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Grid>
              )}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  siblingCount={1}
                  boundaryCount={1}
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      sx={{
                        '&.Mui-selected': {
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

BondLibraryList.propTypes = {
  bonds: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  empty: PropTypes.bool,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};
