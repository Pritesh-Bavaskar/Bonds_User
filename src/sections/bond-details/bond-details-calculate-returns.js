import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
  Card,
  Stack,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSettingsContext } from 'src/components/settings';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function BondDetailsCalculateReturns({ bond }) {
  console.log('Bond calculate data', bond);
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [unitCount, setUnitCount] = useState(1);

  const handleAddUnit = () => {
    setUnitCount((prev) => prev + 1);
  };

  const handleRemoveUnit = () => {
    if (unitCount > 1) {
      setUnitCount((prev) => prev - 1);
    }
  };

  // Top 4 and Bottom 4 mock data
  const topCards = [
    {
      title: 'Returns (YTM)',
      value: `${bond?.bond?.ytm_percent || 'N.A.'}%`,
      icon: '/icons/return.svg',
    },
    {
      title: 'Payment Terms',
      value: bond?.bond?.payment_terms || 'N.A.',
      icon: '/icons/payment.svg',
    },
    {
      title: 'Remaining Tenure',
      value: `${bond?.bond?.tenure?.years || 0} years ${bond?.bond?.tenure?.months || 0} months ${
        bond?.bond?.tenure?.days || 0
      } days`,
      icon: '/icons/tenure.svg',
    },
    {
      title: 'Min. investment',
      value: `₹${bond?.bond?.minimum_investment_rs || 'N.A.'}`,
      icon: '/icons/investment.svg',
    },
  ];

  const bottomCards = [
    { title: 'Credit Rating', value: bond?.bond?.credit_rating || 'N.A.' },
    { title: 'Seniority', value: bond?.bond?.seniority || 'N.A.' },
    { title: 'Security', value: bond?.bond?.security_type || 'N.A.' },
    { title: 'Default History', value: 'Zero' },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {/* ===================== LEFT SECTION ===================== */}
        <Grid item xs={12} md={6} lg={8}>
          <Grid container spacing={2}>
            {/* Pricing Details Card */}
            <Grid item xs={12} md={5}>
              <Card sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 600, fontStyle: 'bold', color: '#306CD3' }}
                >
                  Pricing Details
                </Typography>

                <Grid container spacing={2} direction="row">
                  <Grid item xs={6} md={6}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Face Value
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      ₹{bond?.bond?.face_value_rs || 'NA'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Current Yield
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      ₹{bond?.bond?.current_yield || 'NA'}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* Risk Assessment Card */}
            <Grid item xs={12} md={7}>
              <Card sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 600, fontStyle: 'bold', color: '#306CD3' }}
                >
                  Risk Assessment
                </Typography>

                <Grid container spacing={2} direction="row">
                  <Grid item xs={7} md={7}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Rating
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      {bond?.bond?.ratings[0]?.rating || 'NA'}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} md={5}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Date of Rating
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      {bond?.bond?.ratings[0]?.rating_date || 'NA'}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 600, fontStyle: 'bold', color: '#306CD3' }}
                >
                  Key Attributes
                </Typography>

                <Grid container spacing={2} direction="row" sx={{ mb: 2 }}>
                  <Grid item xs={6} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Interest Frequency
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      {bond?.bond?.interest_payment_frequency || 'NA'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Tax Status
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">{bond?.bond?.tax_free || 'NA'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Mode of Issue
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      {bond?.bond?.mode_of_issuance || 'NA'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={6} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Nature of Instrument
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      {bond?.bond?.listed_unlisted || 'NA'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Collateral Security
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      {bond?.bond?.secured === true
                        ? 'Secured'
                        : bond?.bond?.secured === false
                        ? 'Not Secured'
                        : 'NA'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Seniority
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">{bond?.bond?.seniority || 'NA'}</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 600, fontStyle: 'bold', color: '#306CD3' }}
                >
                  Bond Details
                </Typography>

                <Grid container spacing={2} direction="row" sx={{ mb: 2 }}>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Security Type
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      {bond?.bond?.secured === true
                        ? 'Secured'
                        : bond?.bond?.secured === false
                        ? 'Not Secured'
                        : 'NA'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Principal Frequency
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">Need to check</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Coupon Type
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">Need to check</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Tenure
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">
                      {bond?.bond?.tenure
                        ? [
                            bond.bond.tenure.years ? `${bond.bond.tenure.years} Year` : '',
                            bond.bond.tenure.months ? `${bond.bond.tenure.months} Month` : '',
                            bond.bond.tenure.days ? `${bond.bond.tenure.days} Day` : '',
                          ]
                            .filter(Boolean)
                            .join(' ') || 'NA'
                        : 'NA'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Sector
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">{bond?.company?.company?.sector || 'NA'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Total Issue Size
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">{bond?.bond?.issue_size_lakhs || 'NA'}L</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Date of Issue
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">{bond?.bond?.issue_date || 'NA'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Settlement Date
                      <IconButton size="small" sx={{ pl: 1 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                      </IconButton>
                    </Typography>
                    <Typography variant="subtitle1">Need to check</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* ===================== RIGHT SECTION ===================== */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              minHeight: isMobile ? '300px' : '500px',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #FFAB00',
              borderRadius: 0.5,
            }}
          >
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Calculate Your Returns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Calculate your potential returns from bond investments
                </Typography>
              </Box>
              <Box
                component="img"
                src="/assets/images/bond-details/coins.svg" // replace with your image path
                alt="coins"
              />
            </Box>

            {/* Cashflow button */}
            <Button
              variant="outlined"
              size="small"
              sx={{
                alignSelf: 'flex-end',
                mt: 2,
                textTransform: 'none',
                borderColor: '#FFAB00',
                color: '#FFAB00',
                '&:hover': { borderColor: '#FFAB00', backgroundColor: '#FFF7E0' },
              }}
            >
              Cashflow Timeline
            </Button>

            {/* Text Fields */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Total Receivable
                <IconButton size="small" sx={{ pl: 1 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                </IconButton>
              </Typography>
              <TextField
                fullWidth
                value="₹ 1,30,757.06"
                InputProps={{ readOnly: true }}
                sx={{ mt: 0.5, mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary">
                Total Returns
                <IconButton size="small" sx={{ pl: 1 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 12, color: 'action.active' }} />
                </IconButton>
              </Typography>
              <TextField
                fullWidth
                value="₹ 33,930.08"
                InputProps={{ readOnly: true }}
                sx={{ mt: 0.5, mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary">
                Investment Amount
              </Typography>
              <TextField
                fullWidth
                value="₹ 96,826.98"
                InputProps={{ readOnly: true }}
                sx={{ mt: 0.5 }}
              />
            </Box>

            {/* Unit Selector */}
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
              <IconButton
                onClick={handleRemoveUnit}
                disabled={unitCount <= 1}
                aria-label="remove unit"
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body1"
                sx={{ mx: 2, fontWeight: 'bold', minWidth: 24, textAlign: 'center' }}
              >
                {unitCount} {unitCount === 1 ? 'Unit' : 'Units'}
              </Typography>
              <IconButton onClick={handleAddUnit} aria-label="add unit">
                <AddIcon />
              </IconButton>
            </Box>

            {/* Sign In Button */}
            <Button
              variant="contained"
              sx={{
                mt: 'auto',
                backgroundColor: 'primary.main',
                color: 'white',
                textTransform: 'none',
                py: 1.2,
                fontWeight: 'bold',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              Sign In To Continue
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

BondDetailsCalculateReturns.propTypes = {
  bond: PropTypes.object.isRequired,
};
