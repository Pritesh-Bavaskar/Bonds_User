import React from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import LockIcon from '@mui/icons-material/Lock';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';


const features = [
  {
    title: 'Stability',
    description: 'Fixed returns not linked to volatile market movements, providing predictable income streams.',
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
     icon: <ShowChartIcon/>,
    color: '#F2F4F7',
  },
];

const FeatureCard = ({ icon, title, description, color }) => (
  <Card elevation={0} sx={{
      p: 2,
      textAlign: "center",
      borderRadius: 2,
      height: "100%", 
  }}>
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
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
    <Typography variant="subtitle1" fontWeight={600}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" mt={0.5}>
      {description}
    </Typography>
  </Card>
);

const WhyInvest = () => {
  return (
    <Box sx={{ mx: 'auto', px: { xs: 2, md: 10 }, py: 5 }}>
      <Box
        sx={{
          width: '888px',
          maxWidth: "100%",
          mx: 'auto',
          alignItems: 'center',
          mb: 8,
          textAlign: 'center',
          fontFamily: "Public Sans, sans-serif",

        }}
      >
        <Typography sx={{

          fontFamily: "Public Sans, sans-serif",
          fontSize: '48px',
          lineHeight: '64px',
          fontWeight: 700,
          color: 'primary.main',

        }}>
          Why Invest in Listed Corporate Bonds?
        </Typography>
        <Typography
          sx={{
            height: '61px',
            fontSize: '20px',
            fontWeight: 400,
            fontFamily: "Public Sans, sans-serif",
          }}>
          Discover the compelling advantages that make corporate bonds an essential component of a diversified investment portfolio                    </Typography>
      </Box>

     <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
<Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>
     </Box>
      
    </Box>
  );
};

export default WhyInvest;
