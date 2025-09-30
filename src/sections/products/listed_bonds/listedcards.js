import React from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';

const StatCard = ({ icon, title, subtitle, buttonText }) => (
  <Card
    sx={{
      p: 3,
      width: { xs: 220, md: 280 },
      minHeight: 220,
      textAlign: 'center',
      borderRadius: 3,
      boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0px 6px 16px rgba(0,0,0,0.12)',
      },
    }}
  >
    <Box>
      <Box 
      sx={{ alignItems:'center',mb:2,  margin: '0 auto 10px', display: 'flex', justifyContent: 'center',bgcolor:'#E9F4FF', width:50, height:50,borderRadius:'50%' }}>
        {icon}
        </Box>
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mb: 1, fontSize: { xs: '16px', md: '18px' } }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', fontSize: { xs: '13px', md: '14px' } }}
      >
        {subtitle}
      </Typography>
    </Box>

    {buttonText && (
      <Button
        variant="outlined"
        size="small"
        sx={{
          borderRadius: '20px',
          mt: 2,
          textTransform: 'none',
          fontSize: '12px',
          px: 2,
          py: 0.5,
          alignSelf: 'center',
        }}
      >
        {buttonText}
      </Button>
    )}
  </Card>
);

const Listedcards = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: { xs: 3, md: 6 },
        justifyContent: 'center',       
        mt: 6,
      }}
    >
      <StatCard
       icon={<Icon icon="bx-pulse" width='28px' height='28px'/>}
       bgcolor='#E9F4FF'
        title="High Liquidity"
        subtitle="Easily buy/sell on exchanges"
        buttonText="Find more liquidity"
      />
      <StatCard
        icon={<Icon icon='solar:eye-linear' width='28px' height='28px' />}
        title="Price Transparency"
        subtitle="Market-driven pricing & disclosures"
        buttonText="See price discovery"
      />
      <StatCard
        icon={<Icon icon="bx-pulse" width='28px' height='28px'/>}
        title="SEBI Regulated"
        subtitle="Governed by SEBI & exchange norms"
        buttonText="Investor protection"
      />
    </Box>
  );
};

export default Listedcards;
