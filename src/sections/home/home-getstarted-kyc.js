import React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Icon } from '@iconify/react';
import { useTheme, alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

const PillTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 40,
  '& .MuiTabs-flexContainer': {
    gap: 0,
  },
  '& .MuiTab-root': {
    textTransform: 'uppercase',
    minHeight: 40,
    borderRadius: 999,
    padding: theme.spacing(0.75, 2),
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: 14,
    transition: theme.transitions.create(['background-color', 'color']),
    '&:not(.Mui-selected)': {
      backgroundColor: 'transparent',
    },
    '&.Mui-selected': {
      color: theme.palette.text.primary,
      backgroundColor: '#E1F0FF',
    },
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiTab-root:not(:last-of-type)': {
      marginRight: '-20px',
    },
  },
  '& .MuiTabs-indicator': { display: 'none' },
}));

const StepCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(3),
  borderRadius: 999,
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
}));

const StepBadge = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  background: '#E1F0FF',
  color: theme.palette.text.primary,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  fontWeight: 800,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

function StepItem({ index, title, subtitle }) {
  return (
    <StepCard>
      <Box
        sx={{
          position: 'absolute',
          left: { xs: -24, sm: -28 },
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'center',
        }}
      >
        <StepBadge variant="circular">
          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, fontSize: 10 }}>
            Step
          </Typography>
          <Typography component="span" sx={{ lineHeight: 1, fontSize: 22, fontWeight: 800 }}>
            {index}
          </Typography>
        </StepBadge>
      </Box>

      <Avatar sx={{ bgcolor: '#E1F0FF', width: 36, height: 36 }}>
        <Icon icon="mdi:shield-outline" style={{ color: '#1E293B' }} />
      </Avatar>

      <Stack spacing={0.5} sx={{ maxWidth: 500 }}>
        <Typography>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Stack>
    </StepCard>
  );
}

export default function HomeGetStartedKYC() {
  const [tab, setTab] = React.useState('issuer');
  const theme = useTheme();

  const handleChange = (_e, newValue) => setTab(newValue);

  const isCustomer = tab === 'customer';
  const preferredCustomerSrc = '/assets/images/home/kyc/kyc_customer.svg';
  const fallbackCustomerSrc = '/assets/images/home/kyc/kyc_custormer.svg';
  const imageSrc = isCustomer ? preferredCustomerSrc : '/assets/images/home/kyc/kyc_issuer.svg';

  return (
    <Box component="section" sx={{ pt: { xs: 6, md: 15 } }}>
      <Container>
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            align="center"
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
          >
            Get Started
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 300,
              maxWidth: 900,
            }}
          >
            Completing your KYC is the first step toward investing seamlessly and securely on our
            platform. Our process is 100% paperless, quick, and compliant with SEBI regulations.
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            pt: { xs: 2, md: 4 },
            pb: { xs: 2, md: 6 },
            justifyContent: { xs: 'center', md: 'start' },
          }}
        >
          <Box
            sx={{
              borderRadius: 999,
              px: 0,
              py: 0,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              bgcolor: 'background.paper',
              display: 'inline-block',
              width: '100%',
              maxWidth: 350,
              minWidth: 320,
            }}
          >
            <PillTabs
              value={tab}
              onChange={handleChange}
              aria-label="KYC type tabs"
              variant="fullWidth"
            >
              <Tab value="issuer" label="Issuer KYC" />
              <Tab value="customer" label="Customer KYC" />
            </PillTabs>
          </Box>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={4.5} sx={{ position: 'relative', zIndex: 2 }}>
              <Stack spacing={2.5} sx={{ paddingLeft: 2 }}>
                <StepItem
                  index={1}
                  title="Sign Up"
                  subtitle="Create your free account in minutes."
                />
                <StepItem
                  index={2}
                  title="Upload Documents"
                  subtitle="Provide your PAN, Aadhaar, and a valid bank account."
                />
                <StepItem
                  index={3}
                  title="Verify Identity"
                  subtitle="Complete instant verification through OTP or DigiLocker."
                />
                <StepItem
                  index={4}
                  title={isCustomer ? 'Start Buying' : 'Start Listing Bonds'}
                  subtitle="Once approved, you can explore the opportunities right away."
                />
              </Stack>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: { md: 'absolute' },
              top: 0,
              right: 0,
              bottom: 0,
              width: { xs: '100%', md: '75%' },
              py: { md: 5 },
              pt: { md: 8 },
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                ml: { md: -3 },
              }}
            >
              <Box
                component="img"
                alt="KYC Illustration"
                src={imageSrc}
                onError={
                  isCustomer
                    ? (e) => {
                        if (e?.currentTarget?.src?.includes('kyc_customer.svg')) {
                          e.currentTarget.src = fallbackCustomerSrc;
                        }
                      }
                    : undefined
                }
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '20% center',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
