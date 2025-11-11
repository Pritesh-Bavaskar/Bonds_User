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
  IconButton,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import BondLibraryCardList from '../../components/bond-library-card/bond-library-card-list';
import BondLibraryCardGrid from '../../components/bond-library-card/bond-library-card-grid';
import BondLibraryFilterCriteria from './bond-library-filter-criteria';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

export default function BondLibraryList({ bonds, onSearchChange, onFilterChange }) {
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(!isMobile);

  const handleFilterChange = (queryParams) => {
    // console.log('Filter changed:', queryParams);
    onFilterChange?.(queryParams);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  // console.log('bonds', bonds)
  const handleChangeView = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleToggleFilter = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Stack spacing={4}>
        {/* Search and Filter Bar */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          spacing={2.5}
          sx={{ mb: { md: 4, xs: 0 } }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: 1, sm: 400 } }}>
            <TextField
              placeholder="Search Issuer, ISIN, Security Name"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                flexGrow: 1,
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

            {/* 🔹 Filter Icon — Only for Mobile */}
            {isMobile && (
              <IconButton
                onClick={handleToggleFilter}
                sx={{
                  ml: 1,
                  bgcolor: 'primary.main',
                  color: '#fff',
                  '&:hover': { bgcolor: 'primary.dark' },
                  flexShrink: 0,
                }}
              >
                <Icon icon="mdi:funnel-outline" width={24} height={24} />
              </IconButton>
            )}
          </Box>

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
            {(!isMobile || showFilters) && (
              <BondLibraryFilterCriteria onFilterChange={handleFilterChange} />
            )}
          </Grid>

          {/* Right Content (Bond Cards) */}
          <Grid item xs={12} md={9} lg={9}>
            <Grid container spacing={3}>
              {bonds && bonds.length > 0 ? (
                bonds.map((bond) => (
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
                ))
              ) : (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 8,
                      color: 'text.secondary',
                    }}
                  >
                    <Typography variant="h3" fontWeight={600}>
                      No bonds available
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Try adjusting your filters or search criteria.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

BondLibraryList.propTypes = {
  bonds: PropTypes.array,
  onSearchChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func,
};
