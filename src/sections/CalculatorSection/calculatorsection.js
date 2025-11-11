import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Slider,
  Button,
  TextField,
  InputAdornment,
  Container,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { Icon } from '@iconify/react';
import OvalImg from 'src/images/oval.png';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BondsCalculator() {
  const [investment, setInvestment] = useState(30000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(11);

  const principal = investment * 12 * years;
  const maturity = principal * Math.pow(1 + rate / 100, years);
  const returns = maturity - principal;

  const chartData = {
    labels: ['Total Investment', 'Estimated Returns'],
    datasets: [
      {
        data: [principal, returns],
        backgroundColor: ['#003289', '#1877F2'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false, // ⬅️ Hide default Chart.js legend
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹ ${(+ctx.raw || 0).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: 28, md: 35 },
            fontWeight: 700,
            color: 'primary.main',
          }}
        >
          Bonds Calculator
        </Typography>
      </Container>

      {/* Background Shape and Calculator Container */}
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: 0,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            component="img"
            src={OvalImg}
            alt="Calculator"
            sx={{
              width: '70%',
              objectFit: 'cover',
              py: { xs: 3, md: 3 },
            }}
          />
        </Box>

        {/* Calculator Card - Positioned Dynamically */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: { xs: 8, md: 16 } }}>
          <Grid container spacing={3}>
            {/* Search Bar */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="ISIN Number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="eva:search-fill" width={22} height={22} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    mt: { md: 5, xs: 0 },
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    '& fieldset': { borderColor: 'divider' },
                    '&:hover fieldset': { borderColor: 'text.disabled' },
                  },
                }}
              />
            </Grid>

            {/* Main Calculator Card */}
            <Grid item xs={12}>
              <Card
                elevation={6}
                sx={{
                  borderRadius: 3,
                  overflow: 'visible',
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                  <Grid container spacing={4}>
                    <Grid
                      item
                      xs={12}
                      lg={6}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        p: { xs: 3, md: 4 },
                      }}
                    >
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                          Your Total Amount
                        </Typography>
                        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
                          ₹{Math.round(maturity).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          9.00% interest rate per annum
                        </Typography>
                      </Box>

                      <Box sx={{ width: { xs: 220, md: 280 }, mb: 2 }}>
                        <Doughnut data={chartData} options={chartOptions} />
                        <Stack
                          direction="row"
                          spacing={{ xs: 4, md: 6 }}
                          justifyContent="center"
                          alignItems="flex-start"
                          sx={{ mt: 2 }}
                        >
                          {/* Total Investment */}
                          <Stack direction="column" alignItems="center" spacing={0.5}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Box
                                sx={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: '50px',
                                  bgcolor: '#003289',
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                Total Investment
                              </Typography>
                            </Stack>
                            <Typography variant="subtitle1" fontWeight={700}>
                              ₹{principal.toLocaleString()}
                            </Typography>
                          </Stack>

                          {/* Estimated Returns */}
                          <Stack direction="column" alignItems="center" spacing={0.5}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Box
                                sx={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: '50px',
                                  bgcolor: '#1877F2',
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                Estimated Returns
                              </Typography>
                            </Stack>
                            <Typography variant="subtitle1" fontWeight={700}>
                              ₹{Math.round(returns).toLocaleString()}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Grid>

                    {/* Right Column - Controls */}
                    <Grid item xs={12} lg={6}>
                      <Grid container spacing={3}>
                        {/* Monthly Investment Card */}
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mb: 2,
                            }}
                          >
                            <Typography variant="h6" fontWeight={600}>
                              Monthly Investment
                            </Typography>
                            <Box
                              sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                px: 2,
                                py: 0.5,
                                borderRadius: 1,
                                minWidth: 100,
                                textAlign: 'center',
                                bgcolor: 'background.paper',
                              }}
                            >
                              <Typography fontWeight={500}>
                                ₹{investment.toLocaleString()}
                              </Typography>
                            </Box>
                          </Box>
                          <Slider
                            value={investment}
                            onChange={(_, val) => setInvestment(val)}
                            min={10000}
                            max={100000}
                            step={1000}
                            sx={{ mt: 1 }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mt: 0.5,
                            }}
                          >
                            <Typography variant="caption" color="text.secondary">
                              Min ₹10k
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Max ₹1Lakh
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Expected Return Card */}
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mb: 2,
                            }}
                          >
                            <Typography variant="h6" fontWeight={600}>
                              Expected Return (%)
                            </Typography>
                            <Box
                              sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                px: 2,
                                py: 0.5,
                                borderRadius: 1,
                                minWidth: 80,
                                textAlign: 'center',
                                bgcolor: 'background.paper',
                              }}
                            >
                              <Typography fontWeight={500}>{rate}%</Typography>
                            </Box>
                          </Box>
                          <Slider
                            value={rate}
                            onChange={(_, val) => setRate(val)}
                            min={8}
                            max={15}
                            step={0.5}
                            sx={{ mt: 1 }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mt: 0.5,
                            }}
                          >
                            <Typography variant="caption" color="text.secondary">
                              Min 8%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Max 15%
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Time Period Card */}
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mb: 2,
                            }}
                          >
                            <Typography variant="h6" fontWeight={600}>
                              Time Period
                            </Typography>
                            <Box
                              sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                px: 2,
                                py: 0.5,
                                borderRadius: 1,
                                minWidth: 90,
                                textAlign: 'center',
                                bgcolor: 'background.paper',
                              }}
                            >
                              <Typography fontWeight={500}>{years} Years</Typography>
                            </Box>
                          </Box>
                          <Slider
                            value={years}
                            onChange={(_, val) => setYears(val)}
                            min={1}
                            max={15}
                            step={1}
                            sx={{ mt: 1 }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mt: 0.5,
                            }}
                          >
                            <Typography variant="caption" color="text.secondary">
                              Min 1 year
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Max 15 Years
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          md={6}
                          sx={{
                            mx: 'auto', // ✅ centers the grid itself
                          }}
                        >
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                              py: 1.5,
                              borderRadius: 1,
                              textTransform: 'none',
                              fontSize: '1rem',
                              fontWeight: 600,
                              display: 'flex',
                              justifyContent: 'center',
                              bgcolor: '#00328A',
                            }}
                          >
                            Invest Now
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
