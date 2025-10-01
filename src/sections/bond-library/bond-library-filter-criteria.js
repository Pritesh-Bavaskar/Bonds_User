import { useState } from 'react';
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

// ----------------------------------------------------------------------

// Bond type options
const INTEREST_PAYMENT_FREQUENCY = [
  { id: 'monthly', label: 'MONTHLY' },
  { id: 'quarterly', label: 'QUARTERLY' },
  { id: 'half_yearly', label: 'HALF YEARLY' },
  { id: 'annually', label: 'ANNUALLY' },
  { id: 'cumulative_at_maturity', label: 'CUMULATIVE AT MATURITY' },
];

const CREDIT_RATING = [
  { id: 'aaa', label: 'AAA' },
  { id: 'aa+', label: 'AA+' },
  { id: 'aa-', label: 'AA-' },
  { id: 'a+', label: 'A+' },
  { id: 'a', label: 'A' },
  { id: 'a-', label: 'A-' },
  { id: 'bbb+', label: 'BBB+ and BELOW' },
  { id: 'unrated', label: 'UNRATED' },
];

const FACE_VALUE = [
  { id: '0-1000', label: '0-1000' },
  { id: '1,001-10,000', label: '1,001-10,000' },
  { id: '10,001-100,000', label: '10,001-100,000' },
  { id: '100,001-10L AND ABOVE', label: '100,001-10L AND ABOVE' },
];

const ISSUER_TYPE = [
  { id: 'central_government', label: 'CENTRAL GOVERNMENT' },
  { id: 'state_government', label: 'STATE GOVERNMENT' },
  { id: 'psu', label: 'PSU' },
  { id: 'corporate', label: 'CORPORATE' },
  { id: 'slu', label: 'SLU' },
];

const YIELD_OPTIONS = [
  { id: '4-7', label: '4-7%' },
  { id: '7-10', label: '7-10%' },
  { id: '10+', label: '> 10%' },
];

const COUPON = [
  { id: '4-7', label: '4-7%' },
  { id: '7-10', label: '7-10%' },
  { id: '10+', label: '> 10%' },
];

const BALANCE_TENURE = [
  { id: '0-1', label: '0-1 Years' },
  { id: '1-3', label: '1-3 Years' },
  { id: '3-5', label: '3-5 Years' },
  { id: '5+', label: '>5 Years' },
];

const TAXATION = [
  { id: 'tax_free', label: 'TAX FREE' },
  { id: 'taxable', label: 'TAXABLE' },
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

export default function BondLibraryFilterCriteria() {
  const [filters, setFilters] = useState({
    bondTypes: [],
    couponRange: [0, 15],
    maturityDate: { from: null, to: null },
    prepetual: false,
    zero_coupon: false,
    call_put: false,
    yield: [], 
    balance_tenure: [],
    taxation: [],
    bond_price_lvl: [],
    coupon: [],
  });

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
    setFilters((prev) => ({
      ...prev,
      yield: prev.yield.includes(id) ? prev.yield.filter((y) => y !== id) : [...prev.yield, id],
    }));
  };

  const handleCouponChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      coupon: prev.coupon.includes(id) ? prev.coupon.filter((c) => c !== id) : [...prev.coupon, id],
    }));
  };

  const handleBalanceTenureChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      balance_tenure: prev.balance_tenure.includes(id) ? prev.balance_tenure.filter((b) => b !== id) : [...prev.balance_tenure, id],
    }));
  };  

  const handleTaxationChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      taxation: prev.taxation.includes(id) ? prev.taxation.filter((t) => t !== id) : [...prev.taxation, id],
    }));
  };

  const handleBondPriceLvlChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      bond_price_lvl: prev.bond_price_lvl.includes(id) ? prev.bond_price_lvl.filter((b) => b !== id) : [...prev.bond_price_lvl, id],
    }));
  };

  const handleClearAll = () => {
    setFilters({
      bondTypes: [],
      couponRange: [0, 15],
      maturityDate: { from: null, to: null },
      prepetual: false,
      zero_coupon: false,
      call_put: false,
      yield: [],
      balance_tenure: [],
      coupon: [],
      taxation: [],
      bond_price_lvl: [],
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
              variant={filters.yield.includes(option.id) ? 'contained' : 'outlined'}
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
          {COUPON.map((option) => (
            <Button
              key={option.id}
              variant={filters.coupon.includes(option.id) ? 'contained' : 'outlined'}
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
          {BALANCE_TENURE.map((option) => (
            <Button
              key={option.id}
              variant={filters.balance_tenure.includes(option.id) ? 'contained' : 'outlined'}
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
                  checked={filters.bondTypes.includes(type.id)}
                  onChange={handleBondTypeChange}
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
                  checked={filters.bondTypes.includes(type.id)}
                  onChange={handleBondTypeChange}
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
          {FACE_VALUE.map((type) => (
            <FormControlLabel
              key={type.id}
              control={
                <Checkbox
                  size="small"
                  value={type.id}
                  checked={filters.bondTypes.includes(type.id)}
                  onChange={handleBondTypeChange}
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
                  checked={filters.bondTypes.includes(type.id)}
                  onChange={handleBondTypeChange}
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
