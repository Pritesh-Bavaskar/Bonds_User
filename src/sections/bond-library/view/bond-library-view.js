// @mui
import { useMemo, useState } from 'react';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import BondLibraryHero from '../bond-library-hero';
import BondLibraryList from '../bond-library-list';
import BondLibraryDisclaimer from '../bond-library-disclaimer';
import BondLibraryQuestion from '../bond-library-question';
import { useGetBondsFilter } from 'src/api/bonds';
import { useDebounce } from 'src/hooks/use-debounce';
import { Box } from '@mui/system';
import { Pagination, useStepContext } from '@mui/material';

// ----------------------------------------------------------------------

// In bond-library-view.js
export default function BondLibraryView() {
  const settings = useSettingsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState();

  const generateQueryParams = (filters) => {
    const params = [];

    if (filters.yield && filters.yield.length > 0) {
      filters.yield.forEach((range) => {
        if (range.min !== undefined) params.push(`ytm_percent_min=${range.min}`);
        if (range.max !== undefined && range.max !== null)
          params.push(`ytm_percent_max=${range.max}`);
      });
    }

    if (filters.coupon && filters.coupon.length > 0) {
      filters.coupon.forEach((range) => {
        if (range.min !== undefined) params.push(`coupon_rate_min=${range.min}`);
        if (range.max !== undefined && range.max !== null)
          params.push(`coupon_rate_max=${range.max}`);
      });
    }

    if (filters.balance_tenure && filters.balance_tenure.length > 0) {
      filters.balance_tenure.forEach((range) => {
        if (range.min !== undefined) params.push(`balance_tenure_min=${range.min}`);
        if (range.max !== undefined && range.max !== null)
          params.push(`balance_tenure_max=${range.max}`);
      });
    }

    if (filters.interestPaymentFrequency && filters.interestPaymentFrequency.length > 0) {
      filters.interestPaymentFrequency.forEach((freq) => {
        params.push(`interest_payment_frequency=${encodeURIComponent(freq)}`);
      });
    }

    if (filters.creditRating && filters.creditRating.length > 0) {

      // Use a Set to avoid duplicate values
      const uniqueRatings = [...new Set(filters.creditRating)];

      uniqueRatings.forEach((rating) => {
        const value = rating.trim().toUpperCase();

        if (value === "BBB+") {
          params.push(`rating_max=${encodeURIComponent(value)}`);
        }
        else {
          // Send ONLY credit_rating
          params.push(`credit_rating=${encodeURIComponent(value)}`);
        }
      });
    }




    if (filters.faceValueRanges && filters.faceValueRanges.length > 0) {
      filters.faceValueRanges.forEach((range) => {
        if (range.min !== undefined) params.push(`face_value_min=${range.min}`);
        if (range.max !== undefined && range.max !== null)
          params.push(`face_value_max=${range.max}`);
      });
    }

    if (filters.issuerTypes && filters.issuerTypes.length > 0) {
      filters.issuerTypes.forEach((type) => {
        params.push(`issuer_type=${encodeURIComponent(type)}`);
      });
    }

    if (filters.taxation && filters.taxation.length > 0) {
      filters.taxation.forEach((tax) => {
        params.push(`tax_category=${encodeURIComponent(tax)}`);
      });
    }

    if (filters.bond_price_lvl && filters.bond_price_lvl.length > 0) {
      filters.bond_price_lvl.forEach((tax) => {
        params.push(`bond_price_lvl=${encodeURIComponent(tax)}`);
      });
    }

    return params.join('&');
  };


  // Build the filter string based on search term and filters
  //   const buildFilterString = (term, filters = {}) => {
  //   const params = new URLSearchParams();
  //   params.append('page_size', '15');

  //   if (term) {
  //     params.append('q', term);
  //   }

  //   // Generate filter query string from your helper function
  //   const filterQuery = generateQueryParams(filters);

  //   // Append those filters properly to the params
  //   const queryString = params.toString();
  //   return filterQuery ? `${queryString}&${filterQuery}` : queryString;
  // };



  const debouncedQuery = useDebounce(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const buildFilterString = (term, filters, currentPage, itemsPerPage) => {
    const params = new URLSearchParams();

    params.append('take', itemsPerPage);
    params.append('skip', (currentPage - 1) * itemsPerPage);

    if (term) {
      params.append('q', term);
    }

    if (sortBy === 'latest') {
      params.append('sort_by', 'issue_date');
      params.append('order', 'desc');  
    }

    if (sortBy === 'oldest') {
      params.append('sort_by', 'issue_date');
      params.append('order', 'asc');    
    }

    if (sortBy === 'popular') {
      params.append('sort_by', 'ytm_percent');
      params.append('order', 'desc');   
    }

    const filterQuery = generateQueryParams(filters);

    const baseString = params.toString();
    return filterQuery ? `${baseString}&${filterQuery}` : baseString;
  };


  const finalQueryString = buildFilterString(debouncedQuery, filters, currentPage, itemsPerPage);

  const { Bonds, count } = useGetBondsFilter(finalQueryString);


  const totalPages = Math.round(count / itemsPerPage);



  const handleSearchChange = (term) => {
    setSearchTerm(term.trim());
  };

  const handleFilterChange = (queryParams) => {
    // console.log('Received filter params:', queryParams);
    setFilters(prevFilters => ({
      ...prevFilters,
      ...queryParams
    }));
  };

  console.log("FINAL FILTERS:", filters);
  console.log("GENERATED PARAMS:", generateQueryParams(filters));
  console.log("FINAL QUERY STRING:", finalQueryString);


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* <BondLibraryHero /> */}
      <BondLibraryList
        bonds={Bonds}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onSortChange={setSortBy}
      />
      <Box component='div' sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}>
        {totalPages > 0 && <Pagination page={currentPage} onChange={(e, value) => setCurrentPage(value)} count={totalPages} variant="outlined" color="primary" size="large" />}
      </Box>
      <BondLibraryDisclaimer />
      <BondLibraryQuestion />
    </Container>
  );
}
