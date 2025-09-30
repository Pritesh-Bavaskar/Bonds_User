import { m } from 'framer-motion';
// @mui
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
    title: 'Sovereign Guarantee',
    description: 'Backed by the full faith and credit of the Government of India, offering the highest level of security.',
    icon: 'mdi:shield-check-outline',
  },
  {
    title: 'Regular Coupon Income',
    description: 'Receive fixed interest payments at regular intervals throughout the bond.',
    icon: 'mdi:swap-horizontal',
  },
  {
    title: 'High Liquidity',
    description: 'Trade easily in the secondary market through NSE and BSE with transparent pricing.',
    icon: 'mdi:file-document-multiple-outline',
  },
  {
    title: 'Tax-efficient',
    description: 'No TDS deduction on interest payments, making them more tax-efficient than corporate bonds.',
    icon: 'mdi:file-document-multiple-outline',
  },
  {
    title: 'Versatile Tenures',
    description: 'Choose from short-term Treasury Bills to long-term bonds spanning 1-40 years.',
    icon: 'mdi:shield-check-outline', 
  },
  {
    title: 'Collateral Utility',
    description: 'Use as collateral for loans and meet regulatory requirements for financial institutions.',
    icon: 'mdi:swap-horizontal',
  },
];

// ----------------------------------------------------------------------

export default function Benefit() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 10 },
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <m.div variants={varFade().inRight}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
            Benefits of Government Bonds
          </Box>
        </Typography>
      </m.div>

      {/* Subtitle */}
      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            maxWidth: 800,
            mx: 'auto',
            mb: 5,
            mt: 3,
            color: theme.palette.text.secondary,
          }}
        >
          Discover why government securities are considered the cornerstone of a conservative 
          <br />
          investment portfolio
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
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  height: 210,
                }}
              >
                {/* Icon with circle */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                  }}
                >
                  <Iconify
                    icon={item.icon}
                    width={28}
                    height={28}
                    color={theme.palette.primary.main}
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {item.title}
                </Typography>

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
