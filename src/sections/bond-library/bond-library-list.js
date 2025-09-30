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
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import BondLibraryCardList from './bond-library-card-list';
import BondLibraryCardGrid from './bond-library-card-grid';
import BondLibraryFilterCriteria from './bond-library-filter-criteria';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

const BOND_LIBRARY_DATA = [
  {
    id: '1',
    title: 'Government of India 10Y Bond',
    isin: 'INE002A07KM3',
    price: '₹101.50',
    yield: '7.25%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '15/05/2033',
    type: 'Sovereign',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '2',
    title: 'HDFC Bank Limited',
    isin: 'INE040A07CM2',
    price: '₹102.75',
    yield: '8.10%',
    ipFrequency: 'Annual',
    maturityDate: '10/12/2028',
    type: 'Corporate',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '3',
    title: 'Reliance Industries Limited',
    isin: 'INE002A07KM4',
    price: '₹100.25',
    yield: '7.85%',
    ipFrequency: 'Quarterly',
    maturityDate: '22/08/2030',
    type: 'Corporate',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '4',
    title: 'State Bank of India',
    isin: 'INE002A07KM5',
    price: '₹99.90',
    yield: '7.95%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '05/11/2032',
    type: 'PSU',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '5',
    title: 'Tata Motors Limited',
    isin: 'INE002A07KM6',
    price: '₹98.50',
    yield: '8.45%',
    ipFrequency: 'Annual',
    maturityDate: '18/07/2029',
    type: 'Corporate',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '6',
    title: 'National Highways Authority',
    isin: 'INE002A07KM7',
    price: '₹100.00',
    yield: '7.60%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '30/09/2035',
    type: 'Infrastructure',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '7',
    title: 'National Highways Authority',
    isin: 'INE002A07KM7',
    price: '₹100.00',
    yield: '7.60%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '30/09/2035',
    type: 'Infrastructure',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '8',
    title: 'National Highways Authority',
    isin: 'INE002A07KM7',
    price: '₹100.00',
    yield: '7.60%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '30/09/2035',
    type: 'Infrastructure',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '9',
    title: 'National Highways Authority',
    isin: 'INE002A07KM7',
    price: '₹100.00',
    yield: '7.60%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '30/09/2035',
    type: 'Infrastructure',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '10',
    title: 'National Highways Authority',
    isin: 'INE002A07KM7',
    price: '₹100.00',
    yield: '7.60%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '30/09/2035',
    type: 'Infrastructure',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '11',
    title: 'National Highways Authority',
    isin: 'INE002A07KM7',
    price: '₹100.00',
    yield: '7.60%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '30/09/2035',
    type: 'Infrastructure',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '12',
    title: 'National Highways Authority',
    isin: 'INE002A07KM7',
    price: '₹100.00',
    yield: '7.60%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '30/09/2035',
    type: 'Infrastructure',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
];

export default function BondLibraryList() {
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
              {BOND_LIBRARY_DATA.map((bond) => (
                <Grid
                  key={bond.id}
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
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
