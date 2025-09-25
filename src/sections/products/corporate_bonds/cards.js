import React from 'react';
import { Box, Card, Typography,  } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import arrow1 from 'src/images/svg/arrow1.svg';

const StatCard = ({ icon, title, subtitle }) => (
  <Card
    sx={{
      p: 3,
      width: 261,
      height: 168,
      boxShadow: 4,
      textAlign: 'center',    
      transition:'transform 0.3 ease, box shadow 0.3 ease',
      '&:hover':{
         transform: 'translateY(-6px)',
        boxShadow: 8,
      }
    }}
  >
    <Box sx={{ mb: 1 }}>{icon}</Box>
    <Typography variant="subtitle2"  color='black' mb={2}>
      {title}
    </Typography>
    <Typography variant="subtitle1" fontSize='20px' color='#656565' fontWeight={400}>
      {subtitle}
    </Typography>
  </Card>
);

const InvestmentStats = () => {
  return (
    <Box sx={{ display: 'flex', gap: 20, justifyContent: 'center', mt: 4 }}>
      <StatCard
        icon={<BarChartIcon color="#000000" />}
        title="Tenure"
        subtitle="12–35 Months"
      />
      <StatCard
    
        icon={
           <Box
          component='img'
          src={arrow1}
          alt="arrow"
          sx={{
            width:'30px',
            height:'30px',  
          }} />}
        title="Expected IRR"
        subtitle="8%–14%"   
      />
    </Box>
  );
};


export default InvestmentStats;
