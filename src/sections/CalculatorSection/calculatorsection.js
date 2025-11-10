// src/components/BondsCalculatorHero.jsx
import React, { useState } from 'react';
import { Box, Grid, Typography, Slider, Button, useMediaQuery, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// components
import Iconify from 'src/components/iconify';
import OvalImg from 'src/images/oval.png';
import { Container } from '@mui/material';
// Chart.js imports
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BondsCalculatorSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [investment, setInvestment] = useState(30000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(11);

  const principal = investment * 12 * years;
  const maturity = principal * Math.pow(1 + rate / 100, years);
  const returns = maturity - principal;

  // Chart data
  const chartData = {
    labels: ['Total Investment', 'Estimated Returns'],
    datasets: [
      {
        data: [principal, returns],
        backgroundColor: ['#97C4FF', '#003289'], // dark + light blue
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%', // makes donut thick
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.raw || 0;
            return `₹ ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        py: 5,
        maxWidth: '100%',
        width: '100%',
        px: 0,
        // mx: "auto",
        height: '800px',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <Typography
          sx={{
            fontSize: { xs: 28, md: 35 },
            fontWeight: 600,
            color: 'primary.main',
            textAlign: 'left',
            pl: 10,
            // pl: "91px",
          }}
        >
          Bonds Calculator
        </Typography>

        {/* Background Image */}
        <Box
          component="img"
          src={OvalImg}
          alt="Calculator"
          sx={{
            width: '70%',
            height: { xs: 300, md: 800 },
            objectFit: 'cover',
            py: { xs: 3, md: 3 },
            bgcolor: '#fff',
          }}
        />
        {/* Small pill over image */}
        <TextField
          halfWidth
          placeholder="ISIN Number"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={22} />
              </InputAdornment>
            ),
          }}
          sx={{
            position: 'absolute',
            top: { xs: '20%', md: '15%' },
            left: '11%',
            zIndex: 3,
            paddingBottom: { xs: 3, sm: 4, md: 1 },
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              bgcolor: 'background.paper',
              boxShadow: (theme) => theme.customShadows?.z8 || '0 2px 12px rgba(0,0,0,0.08)',
              '& fieldset': { borderColor: 'divider' },
              '&:hover fieldset': { borderColor: 'text.disabled' },
            },
            '& input': { py: { xs: 1.25, sm: 1.5 } },
            maxWidth: { xs: '100%', sm: 680, md: 800 },
          }}
        />

        {/* Calculator Box */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '20%', md: '25%' },
            left: '48%',
            transform: 'translateX(-50%)',
            width: { xs: '90%', md: '1100px' },
            bgcolor: '#f9f9f9',
            py: { xs: 3, md: 6 },
            pr: { xs: 3, md: 16 },
            borderRadius: 3,
            boxShadow: 3,
            zIndex: 2,
          }}
        >
          <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 1200, mx: 'auto' }}>
            {/* Left Side - Donut Chart */}
            <Grid item xs={12} md={6} textAlign="center">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  mt: 2,
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  Your Total Amount
                </Typography>

                <Typography variant="h6" fontWeight={600} color="primary">
                  ₹{maturity.toLocaleString()}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  9.00% interest rate per annum
                </Typography>
              </Box>

              <Box sx={{ position: 'relative', width: isMobile ? 200 : 300, mx: ' auto', my: 2 }}>
                <Doughnut data={chartData} options={chartOptions} />
                <Typography
                  sx={{
                    fontSize: '12px',
                    display: 'flex',
                    gap: 5,
                    ml: 2,
                    justifyContent: 'center',
                  }}
                >
                  <span> ₹{principal.toLocaleString()}</span>
                  <span>₹{returns.toLocaleString()}</span>
                </Typography>

                {/* Center Text */}
                {/* <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Amount
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="primary">
                    ₹ {maturity.toLocaleString()}
                  </Typography>
                </Box>  */}
              </Box>
            </Grid>

            {/* Right Side - Sliders */}
            <Grid item xs={12} md={6}>
              <Box margin={3}>
                {/* Monthly Investment */}

                <Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      Monthly Investment
                    </Typography>
                    <Typography
                      sx={{
                        border: '1px solid #ccc',
                        px: 3,
                        py: 0.3,
                        borderRadius: 1,
                        fontWeight: 500,
                        minWidth: 80,
                        textAlign: 'center',
                        bgcolor: '#fff',
                      }}
                    >
                      ₹{investment.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box sx={{ ml: 5 }}>
                    <Slider
                      value={investment}
                      onChange={(_, val) => setInvestment(val)}
                      min={10000}
                      max={100000}
                      step={1000}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row ',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="caption">Min ₹10k</Typography>
                      <Typography variant="caption">Max ₹1Lakh</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Expected Return */}
                <Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      Expected Return (%)
                    </Typography>
                    <Typography
                      sx={{
                        border: '1px solid #ccc',
                        px: 3,
                        py: 0.3,
                        borderRadius: 1,
                        fontWeight: 500,
                        minWidth: 60,
                        textAlign: 'center',
                        bgcolor: '#fff',
                      }}
                    >
                      {rate}%
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 5 }}>
                    <Slider
                      value={rate}
                      onChange={(_, val) => setRate(val)}
                      min={8}
                      max={15}
                      step={0.5}
                      sx={{ mt: 0 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">Min 8%</Typography>
                      <Typography variant="caption">Max 15%</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Time Period */}
                <Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      Time Period
                    </Typography>
                    <Typography
                      sx={{
                        border: '1px solid #ccc',
                        px: 3,
                        py: 0.3,
                        borderRadius: 1,
                        fontWeight: 500,
                        minWidth: 70,
                        textAlign: 'center',
                        bgcolor: '#fff',
                      }}
                    >
                      {years} Years
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 5 }}>
                    <Slider
                      value={years}
                      onChange={(_, val) => setYears(val)}
                      min={1}
                      max={15}
                      step={1}
                      sx={{ mt: 0 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">Min 1 year</Typography>
                      <Typography variant="caption">Max 15 Years</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  size="230px"
                  sx={{
                    mt: 2,
                    py: 2,
                    px: 5,
                    borderRadius: 0,
                    bgcolor: 'primary.main',
                    color: '#fff',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  Invest Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
