import { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

// Bond type options
const INTEREST_PAYMENT_FREQUENCY = [
  { id: 'monthly', label: 'MONTHLY' },
  { id: 'quarterly', label: 'QUARTERLY' },
  { id: 'half_yearly', label: 'HALF YEARLY' },
  { id: 'annually', label: 'ANNUALLY' },
  { id: 'cumulative', label: 'CUMULATIVE AT MATURITY' },
];

const CREDIT_RATING = [
  { id: 'AAA', label: 'AAA' },
  { id: 'AA+', label: 'AA+' },
  { id: 'AA-', label: 'AA-' },
  { id: 'A+', label: 'A+' },
  { id: 'A', label: 'A' },
  { id: 'A-', label: 'A-' },
  { id: 'BBB+', label: 'BBB+ and BELOW' },
  { id: 'unrated', label: 'UNRATED' },
];

const FACE_VALUE = [
  { id: '0-1000', label: '0-1000', min: 0, max: 1000 },
  { id: '1001-10000', label: '1,001-10,000', min: 1001, max: 10000 },
  { id: '10001-100000', label: '10,001-100,000', min: 10001, max: 100000 },
  { id: '100001-1000000', label: '100,001-10L AND ABOVE', min: 100001, max: 1000000 },
];

const ISSUER_TYPE = [
  { id: 'central_gov', label: 'CENTRAL GOVERNMENT' },
  { id: 'state_gov', label: 'STATE GOVERNMENT' },
  { id: 'psu', label: 'PSU' },
  { id: 'corporate', label: 'CORPORATE' },
  { id: 'slu', label: 'SLU' },
];

const YIELD_OPTIONS = [
  { id: '4-7', label: '4-7%', min: 4, max: 7 },
  { id: '7-10', label: '7-10%', min: 7, max: 10 },
  { id: '10+', label: '> 10%', min: 10, max: null },
];

const COUPON_OPTIONS = [
  { id: '4-7', label: '4-7%', min: 4, max: 7 },
  { id: '7-10', label: '7-10%', min: 7, max: 10 },
  { id: '10+', label: '> 10%', min: 10, max: null },
];

const BALANCE_TENURE_OPTIONS = [
  { id: '0-1', label: '0-1 Years', min: 0, max: 1 },
  { id: '1-3', label: '1-3 Years', min: 1, max: 3 },
  { id: '3-5', label: '3-5 Years', min: 3, max: 5 },
  { id: '5+', label: '>5 Years', min: 5, max: null },
];

const TAXATION = [
  { id: 'TAX_FREE', label: 'TAX FREE' },
  { id: 'TAXABLE', label: 'TAXABLE' },
];

const BOND_PRICE_LVL = [
  { id: 'on_premium', label: 'ON PREMIUM' },
  { id: 'on_discount', label: 'ON DISCOUNT' },
  { id: 'on_par', label: 'ON PAR' },
];

const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          mb: 1.5,
          '&:hover': {
            '& .section-title': {
              color: 'primary.main',
            },
          },
        }}
      >
        <Typography
          variant="subtitle2"
          className="section-title"
          sx={{
            fontWeight: 600,
            transition: 'color 0.2s',
          }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          sx={{ p: 0, ml: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      {isOpen && children}
    </Box>
  );
};

export default function BondLibraryFilterCriteria({ onFilterChange }) {
  const [filters, setFilters] = useState({
    bondTypes: [],
    creditRating: [],
    interestPaymentFrequency: [],
    // couponRange: [0, 15],
    // maturityDate: { from: null, to: null },
    // prepetual: false,
    // zero_coupon: false,
    // call_put: false,
    yield: [],
    balance_tenure: [],
    taxation: [],
    bond_price_lvl: [],
    coupon: [],
    faceValueRanges: [],
    issuerTypes: [],
  });

  useEffect(() => {
    // console.log('filters', filters);
    const queryParams = generateQueryParams(filters);
    // console.log('Query Params:', queryParams);
    onFilterChange?.(filters);
  }, [filters]);

  const generateQueryParams = (filters) => {
    const params = [];

    // YIELD - Handle multiple ranges
    if (filters.yield && filters.yield.length > 0) {
      filters.yield.forEach((range) => {
        if (range.min !== undefined) params.push(`ytm_percent_min=${range.min}`);
        if (range.max !== undefined && range.max !== null)
          params.push(`ytm_percent_max=${range.max}`);
      });
    }

    // COUPON - Handle multiple ranges
    if (filters.coupon && filters.coupon.length > 0) {
      filters.coupon.forEach((range) => {
        if (range.min !== undefined) params.push(`coupon_rate_min=${range.min}`);
        if (range.max !== undefined && range.max !== null)
          params.push(`coupon_rate_max=${range.max}`);
      });
    }

    // BALANCE TENURE - Handle multiple ranges
    if (filters.balance_tenure && filters.balance_tenure.length > 0) {
      filters.balance_tenure.forEach((range) => {
        if (range.min !== undefined) params.push(`balance_tenure_min=${range.min}`);
        if (range.max !== undefined && range.max !== null)
          params.push(`balance_tenure_max=${range.max}`);
      });
    }

    // INTEREST PAYMENT FREQUENCY - Handle multiple frequencies as separate parameters
    if (filters.interestPaymentFrequency && filters.interestPaymentFrequency.length > 0) {
      filters.interestPaymentFrequency.forEach((freq) => {
        params.push(`interest_payment_frequency=${encodeURIComponent(freq)}`);
      });
    }

    // CREDIT RATING - Handle multiple ratings as separate parameters
    if (filters.creditRating && filters.creditRating.length > 0) {
      filters.creditRating.forEach((rating) => {
        params.push(`credit_rating=${encodeURIComponent(rating)}`);
      });
    }

    // FACE VALUE - Handle multiple ranges
    if (filters.faceValueRanges && filters.faceValueRanges.length > 0) {
      filters.faceValueRanges.forEach((range) => {
        if (range.min !== undefined) params.push(`face_value_min=${range.min}`);
        if (range.max !== undefined && range.max !== null)
          params.push(`face_value_max=${range.max}`);
      });
    }

    // ISSUER TYPE - Handle multiple issuer types as separate parameters
    if (filters.issuerTypes && filters.issuerTypes.length > 0) {
      filters.issuerTypes.forEach((type) => {
        params.push(`issuer_type=${encodeURIComponent(type)}`);
      });
    }

    // TAXATION - Handle multiple tax categories as separate parameters
    if (filters.taxation && filters.taxation.length > 0) {
      filters.taxation.forEach((tax) => {
        params.push(`tax_category=${encodeURIComponent(tax)}`);
      });
    }

    return params.join('&');
  };

  const handleFaceValueChange = (event) => {
    const { value, checked } = event.target;
    const selectedOption = FACE_VALUE.find((option) => option.id === value);

    if (!selectedOption) return;

    const optionRange = { min: selectedOption.min, max: selectedOption.max };

    setFilters((prev) => ({
      ...prev,
      faceValueRanges: checked
        ? [...prev.faceValueRanges, optionRange]
        : prev.faceValueRanges.filter(
          (range) => !(range.min === optionRange.min && range.max === optionRange.max)
        ),
    }));
  };

  const handleIssuerTypeChange = (event) => {
    const { value, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      issuerTypes: checked
        ? [...prev.issuerTypes, value]
        : prev.issuerTypes.filter((type) => type !== value),
    }));
  };

  const handleBondTypeChange = (event) => {
    const { value, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      bondTypes: checked
        ? [...prev.bondTypes, value]
        : prev.bondTypes.filter((type) => type !== value),
    }));
  };

  const handleYieldChange = (id) => {
    setFilters((prev) => {
      const selectedOption = YIELD_OPTIONS.find((option) => option.id === id);
      const optionRange = { min: selectedOption.min, max: selectedOption.max };

      // Check if this range is already selected
      const isSelected = prev.yield.some(
        (range) => range.min === optionRange.min && range.max === optionRange.max
      );

      return {
        ...prev,
        yield: isSelected
          ? prev.yield.filter(
            (range) => !(range.min === optionRange.min && range.max === optionRange.max)
          )
          : [...prev.yield, optionRange],
      };
    });
  };

  const handleCouponChange = (id) => {
    setFilters((prev) => {
      const selectedOption = COUPON_OPTIONS.find((option) => option.id === id);
      const optionRange = { min: selectedOption.min, max: selectedOption.max };

      // Check if this range is already selected
      const isSelected = prev.coupon.some(
        (range) => range.min === optionRange.min && range.max === optionRange.max
      );

      return {
        ...prev,
        coupon: isSelected
          ? prev.coupon.filter(
            (range) => !(range.min === optionRange.min && range.max === optionRange.max)
          )
          : [...prev.coupon, optionRange],
      };
    });
  };

  const handleBalanceTenureChange = (id) => {
    setFilters((prev) => {
      const selectedOption = BALANCE_TENURE_OPTIONS.find((option) => option.id === id);
      const optionRange = { min: selectedOption.min, max: selectedOption.max };

      // Check if this range is already selected
      const isSelected = prev.balance_tenure.some(
        (range) => range.min === optionRange.min && range.max === optionRange.max
      );

      return {
        ...prev,
        balance_tenure: isSelected
          ? prev.balance_tenure.filter(
            (range) => !(range.min === optionRange.min && range.max === optionRange.max)
          )
          : [...prev.balance_tenure, optionRange],
      };
    });
  };

  const handleInterestPaymentFrequencyChange = (event) => {
    const { value, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      interestPaymentFrequency: checked
        ? [...prev.interestPaymentFrequency, value]
        : prev.interestPaymentFrequency.filter((type) => type !== value),
    }));
  };

  const handleCreditRatingChange = (event) => {
    const { value, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      creditRating: checked
        ? [...prev.creditRating, value]
        : prev.creditRating.filter((type) => type !== value),
    }));
  };

  const handleTaxationChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      taxation: prev.taxation.includes(id)
        ? prev.taxation.filter((t) => t !== id)
        : [...prev.taxation, id],
    }));
  };

  const handleBondPriceLvlChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      bond_price_lvl: prev.bond_price_lvl.includes(id)
        ? prev.bond_price_lvl.filter((b) => b !== id)
        : [...prev.bond_price_lvl, id],
    }));
  };

  const handleClearAll = () => {
    setFilters({
      bondTypes: [],
      creditRating: [],
      interestPaymentFrequency: [],
      // couponRange: [0, 15],
      // maturityDate: { from: null, to: null },
      // prepetual: false,
      // zero_coupon: false,
      // call_put: false,
      yield: [],
      balance_tenure: [],
      taxation: [],
      bond_price_lvl: [],
      coupon: [],
      faceValueRanges: [],
      issuerTypes: [],
    });
  };

  return (
    <Box
      sx={{
        pt: { xs: 4, md: 3 },
        pb: { xs: 3, md: 3 },
        px: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: (theme) => theme.customShadows.z8,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filter criteria
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={handleClearAll}
          sx={{
            textTransform: 'none',
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
              bgcolor: 'transparent',
            },
          }}
        >
          Clear all
        </Button>
      </Box>

      {/* YIELD Section */}
      <CollapsibleSection title="YIELD (% RETURN)">
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {YIELD_OPTIONS.map((option) => (
            <Button
              key={option.id}
              variant={
                filters.yield.some((range) => range.min === option.min && range.max === option.max)
                  ? 'contained'
                  : 'outlined'
              }
              size="small"
              onClick={() => handleYieldChange(option.id)}
              sx={{
                borderRadius: 5,
                textTransform: 'none',
                fontSize: '0.8rem',
                px: 2,
                py: 0.5,
                '&.MuiButton-contained': {
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              {option.label}
            </Button>
          ))}
        </Stack>
      </CollapsibleSection>

      <Divider sx={{ my: 2 }} />

      {/* Coupon Section */}
      <CollapsibleSection title="COUPON (% RETURN)">
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {COUPON_OPTIONS.map((option) => (
            <Button
              key={option.id}
              variant={
                filters.coupon.some((range) => range.min === option.min && range.max === option.max)
                  ? 'contained'
                  : 'outlined'
              }
              size="small"
              onClick={() => handleCouponChange(option.id)}
              sx={{
                borderRadius: 5,
                textTransform: 'none',
                fontSize: '0.8rem',
                px: 2,
                py: 0.5,
                '&.MuiButton-contained': {
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              {option.label}
            </Button>
          ))}
        </Stack>
      </CollapsibleSection>

      <Divider sx={{ my: 2 }} />

      {/* Balance Tenure Section */}
      <CollapsibleSection title="BALANCE TENURE">
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {BALANCE_TENURE_OPTIONS.map((option) => (
            <Button
              key={option.id}
              variant={
                filters.balance_tenure.some(
                  (range) => range.min === option.min && range.max === option.max
                )
                  ? 'contained'
                  : 'outlined'
              }
              size="small"
              onClick={() => handleBalanceTenureChange(option.id)}
              sx={{
                borderRadius: 5,
                textTransform: 'none',
                fontSize: '0.8rem',
                px: 2,
                py: 0.5,
                '&.MuiButton-contained': {
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              {option.label}
            </Button>
          ))}
        </Stack>
      </CollapsibleSection>

      <Divider sx={{ my: 2 }} />

      {/* Interest Payment Frequency Section */}
      <CollapsibleSection title="INTEREST PAYMENT FREQUENCY">
        <FormGroup>
          {INTEREST_PAYMENT_FREQUENCY.map((type) => (
            <FormControlLabel
              key={type.id}
              control={
                <Checkbox
                  size="small"
                  value={type.id}
                  checked={filters.interestPaymentFrequency.includes(type.id)}
                  onChange={handleInterestPaymentFrequencyChange}
                />
              }
              label={<Typography variant="caption">{type.label}</Typography>}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                },
                '&:not(:last-child)': { mb: 0.5 },
              }}
            />
          ))}
        </FormGroup>
      </CollapsibleSection>

      <Divider sx={{ my: 2 }} />

      {/* CREDIT RATING Section */}
      <CollapsibleSection title="CREDIT RATING">
        <FormGroup>
          {CREDIT_RATING.map((type) => (
            <FormControlLabel
              key={type.id}
              control={
                <Checkbox
                  size="small"
                  value={type.id}
                  checked={filters.creditRating.includes(type.id)}
                  onChange={handleCreditRatingChange}
                />
              }
              label={<Typography variant="caption">{type.label}</Typography>}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                },
                '&:not(:last-child)': { mb: 0.5 },
              }}
            />
          ))}
        </FormGroup>
      </CollapsibleSection>

      <Divider sx={{ my: 2 }} />

      {/* FACE VALUE Section */}
      <CollapsibleSection title="FACE VALUE">
        <FormGroup>
          {FACE_VALUE.map((type) => {
            const isSelected = filters.faceValueRanges.some(
              (range) => range.min === type.min && range.max === type.max
            );

            return (
              <FormControlLabel
                key={type.id}
                control={
                  <Checkbox
                    size="small"
                    value={type.id}
                    checked={isSelected}
                    onChange={handleFaceValueChange}
                  />
                }
                label={<Typography variant="caption">{type.label}</Typography>}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                  },
                  '&:not(:last-child)': { mb: 0.5 },
                }}
              />
            );
          })}
        </FormGroup>
      </CollapsibleSection>

      <Divider sx={{ my: 2 }} />

      {/* ISSUER TYPE Section */}
      <CollapsibleSection title="ISSUER TYPE">
        <FormGroup>
          {ISSUER_TYPE.map((type) => (
            <FormControlLabel
              key={type.id}
              control={
                <Checkbox
                  size="small"
                  value={type.id}
                  checked={filters.issuerTypes.includes(type.id)}
                  onChange={handleIssuerTypeChange}
                />
              }
              label={<Typography variant="caption">{type.label}</Typography>}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                },
                '&:not(:last-child)': { mb: 0.5 },
              }}
            />
          ))}
        </FormGroup>
      </CollapsibleSection>

      <Divider sx={{ my: 2 }} />

      {/* TAXATION Section */}
      <CollapsibleSection title="TAXATION">
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {TAXATION.map((option) => (
            <Button
              key={option.id}
              variant={filters.taxation.includes(option.id) ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handleTaxationChange(option.id)}
              sx={{
                borderRadius: 5,
                textTransform: 'none',
                fontSize: '0.8rem',
                px: 2,
                py: 0.5,
                '&.MuiButton-contained': {
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              {option.label}
            </Button>
          ))}
        </Stack>
      </CollapsibleSection>

      <Divider sx={{ my: 2 }} />

      {/* BOND PRICE LEVEL Section */}
      <CollapsibleSection title="BOND PRICE LEVEL">
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {BOND_PRICE_LVL.map((option) => (
            <Button
              key={option.id}
              variant={filters.bond_price_lvl.includes(option.id) ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handleBondPriceLvlChange(option.id)}
              sx={{
                borderRadius: 5,
                textTransform: 'none',
                fontSize: '0.8rem',
                px: 2,
                py: 0.5,
                '&.MuiButton-contained': {
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              {option.label}
            </Button>
          ))}
        </Stack>
      </CollapsibleSection>

      <Divider sx={{ my: 2 }} />

      {/* PREPETUAL Switch */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
          PREPETUAL
        </Typography>
        <Switch
          checked={filters.prepetual}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              prepetual: e.target.checked,
            }))
          }
          color="primary"
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* ZERO COUPON Switch */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
          ZERO COUPON
        </Typography>
        <Switch
          checked={filters.zero_coupon}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              zero_coupon: e.target.checked,
            }))
          }
          color="primary"
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* CALL PUT Switch */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
          CALL PUT
        </Typography>
        <Switch
          checked={filters.call_put}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              call_put: e.target.checked,
            }))
          }
          color="primary"
        />
      </Stack>
    </Box>
  );
}


BondLibraryFilterCriteria.propTypes = {
  onFilterChange: PropTypes.func,
};