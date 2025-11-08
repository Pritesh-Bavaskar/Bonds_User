import { m } from 'framer-motion';
// @mui
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    title: 'Treasury Bills',
    description: 'Backed by the full faith and credit of the Government of India, offering the highest level of security.',
    icon: 'mdi:shield-check-outline',
    days:"91, 182, 364 days",
    badge: 'Discount'
  },
  {
    title: 'Regular Coupon Income',
    description: 'Receive fixed interest payments at regular intervals throughout the bond.',
    icon: 'mdi:swap-horizontal',
    days:"91 days"
  },
  {
    title: 'High Liquidity',
    description: 'Trade easily in the secondary market through NSE and BSE with transparent pricing.',
    icon: 'mdi:file-document-multiple-outline',
    days:"1-40 Years",
    badge: 'Discount'

  },
  {
    title: 'Tax-efficient',
    description: 'No TDS deduction on interest payments, making them more tax-efficient than corporate bonds.',
    icon: 'mdi:file-document-multiple-outline',
    days:"Various",
    badge: 'Discount'
  },
  {
    title: 'Versatile Tenures',
    description: 'Choose from short-term Treasury Bills to long-term bonds spanning 1-40 years.',
    icon: 'mdi:shield-check-outline', 
    days:"Various",

  },
  {
    title: 'Collateral Utility',
    description: 'Use as collateral for loans and meet regulatory requirements for financial institutions.',
    icon: 'mdi:swap-horizontal',
    days:"8 Years",
    badge: 'Discount'

  },
];

// ----------------------------------------------------------------------

export default function Gov_securities_type() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 4, md: 4 },
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <m.div variants={varFade().inRight}>
        <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
            Types of Government Securities
          </Box>
        </Typography>
      </m.div>

      {/* Subtitle */}
      <m.div variants={varFade().inUp}>
        <Typography
          variant="h5"
          sx={{
            mx: 'auto',
            mb: 5,
            mt: 3,
            color: theme.palette.text.secondary,
          }}
        >
          Choose from a diverse range of government instruments tailored to different investment 
          <br />
          horizons and objectives.
        </Typography>
      </m.div>

      {/* Features */}

<Grid container spacing={4} justifyContent="center">
  {FEATURES.map((item, index) => (
    <Grid xs={12} sm={6} md={4} key={item.title}>
      <m.div variants={varFade().inUp}>
        <Box
          sx={{
            p: 4,
            height: '100%',
            textAlign: 'left',
            borderRadius: 2,
            boxShadow: 3,
            position: 'relative',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            height: 170,
          }}
        >
          {/* Badge */}
          {item.badge && (
            <Chip
              label={item.badge}
              size="small"
              variant="outlined"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontSize: 12,
                fontWeight: 500,
                bgcolor: 'background.paper',
              }}
            />
          )}

          <Typography
            gutterBottom
            sx={{ fontWeight: 600, mb: 1, fontSize: 15 }}
          >
            {item.title}
          </Typography>


          {/* Days */}
          {item.days && (
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'primary.main', mb: 1 }}>
              {item.days}
            </Typography>
          )}

          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ height: 50 }}>
            {item.description}
          </Typography>
        </Box>
      </m.div>
    </Grid>
  ))}
</Grid>
    </Container>
  );
}