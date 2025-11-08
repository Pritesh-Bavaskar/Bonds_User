import React from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import LockIcon from '@mui/icons-material/Lock';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { m } from 'framer-motion'; // <-- Add this

const features = [
  {
    title: 'Stability',
    description:
      'Fixed returns not linked to volatile market movements, providing predictable income streams.',
    icon: <SecurityIcon />,
    color: '#D1FADF',
  },
  {
    title: 'Better Yield',
    description: 'Higher returns compared to traditional fixed deposits and savings accounts.',
    icon: <TrendingUpIcon />,
    color: '#D1E9FF',
  },
  {
    title: 'Less Risky',
    description: 'Lower risk profile compared to equity investments with more stable returns.',
    icon: <BarChartIcon />,
    color: '#FEE4E2',
  },
  {
    title: 'Secured',
    description: 'Backed by corporate collateral and guarantees for enhanced investor protection.',
    icon: <LockIcon />,
    color: '#FCE7F6',
  },
  {
    title: 'Passive Income',
    description: 'Regular interest payments without active portfolio management requirements.',
    icon: <AttachMoneyIcon />,
    color: '#FEF0C7',
  },
  {
    title: 'Liquidity',
    description: 'Easy trading on NSE/BSE exchanges for improved liquidity and exit options.',
    icon: <ShowChartIcon />,
    color: '#F2F4F7',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const FeatureCard = ({ icon, title, description, color, index }) => (
  <m.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    style={{ height: '100%' }}
  >
    <Card
      elevation={0}
      sx={{
        p: 2,
        textAlign: 'center',
        borderRadius: 2,
        height: '192px',
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          py: { xs: 2, md: 3 },
          width: 40,
          height: 40,
          mx: 'auto',
          mb: 1.5,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" mt={1}>
        {description}
      </Typography>
    </Card>
  </m.div>
);

const WhyInvest = () => {
  return (
    <Box sx={{ mx: 'auto', px: { xs: 2, md: 10 }, py: 5 }}>
      <m.div
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            alignItems: 'center',
            mb: 8,
            textAlign: 'center',
            fontFamily: 'Public Sans, sans-serif',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Public Sans, sans-serif',
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
            Why Invest in Listed Corporate Bonds?
          </Typography>
          <Typography
            sx={{
              variant: "h5",
              fontWeight: 400,
              lineHeight: 1.5,
              my: 2,
              fontFamily: 'Public Sans, sans-serif',
            }}
          >
            Discover the compelling advantages that make corporate bonds an essential component of a
            diversified investment portfolio
          </Typography>
        </Box>
      </m.div>

      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WhyInvest;
