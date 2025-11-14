// @mui
import { useState } from 'react';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import BondLibraryHero from '../bond-library-hero';
import BondLibraryList from '../bond-library-list';
import BondLibraryDisclaimer from '../bond-library-disclaimer';
import BondLibraryQuestion from '../bond-library-question';
import { useGetBondsFilter } from 'src/api/bonds';

// ----------------------------------------------------------------------

// In bond-library-view.js
export default function BondLibraryView() {
  const settings = useSettingsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

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
    filters.creditRating.forEach((rating) => {
      params.push(`credit_rating=${encodeURIComponent(rating)}`);
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

  return params.join('&');
};


  // Build the filter string based on search term and filters
  const buildFilterString = (term, filters = {}) => {
  const params = new URLSearchParams();
  params.append('page_size', '15');

  if (term) {
    params.append('isin', term);
  }

  // Generate filter query string from your helper function
  const filterQuery = generateQueryParams(filters);

  // Append those filters properly to the params
  const queryString = params.toString();
  return filterQuery ? `${queryString}&${filterQuery}` : queryString;
};


  const { Bonds } = useGetBondsFilter(buildFilterString(searchTerm, filters));

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

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* <BondLibraryHero /> */}
      <BondLibraryList
        bonds={Bonds}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      <BondLibraryDisclaimer />
      <BondLibraryQuestion />
    </Container>
  );
}
