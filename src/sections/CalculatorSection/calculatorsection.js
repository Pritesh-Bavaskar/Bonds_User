// src/components/BondsCalculatorHero.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Slider,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";

export default function BondsCalculatorSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [investment, setInvestment] = useState(30000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(11);

  const principal = investment * 12 * years;
  const maturity = principal * Math.pow(1 + rate / 100, years);
  const returns = maturity - principal;

  return (
    <Box sx={{ width: "100%", py: 6, bgcolor: "#f9f9f9" }}>
      <Box display='flex'>
         <Typography 
              sx={{ fontSize:'40px', 
                fontWeight:'600',
                color:'primary.main',
                
                }}>
                  Bonds Calculator
                  </Typography>

      </Box>
              
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}
      >
        {/* Left Side - Chart + Total */}
        <Grid item xs={12} md={6} textAlign="center">
          
          <Typography variant="h6" gutterBottom>
            Your Total Amount
          </Typography>
          <Typography variant="h4" fontWeight={600} color="primary">
            ₹ {maturity.toLocaleString()}
          </Typography>

          <Box sx={{ my: 4 }}>
            <CircularProgress
              variant="determinate"
              value={(principal / maturity) * 100}
              size={isMobile ? 180 : 240}
              thickness={4}
              sx={{ color: theme.palette.primary.main }}
            />
          </Box>

          <Typography variant="body2">
            <strong>Total Investment:</strong> ₹{principal.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            <strong>Estimated Returns:</strong> ₹{returns.toLocaleString()}
          </Typography>
        </Grid>

        {/* Right Side - Sliders */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box>
              <Typography>Monthly Investment</Typography>
              <Slider
                value={investment}
                onChange={(e, val) => setInvestment(val)}
                min={10000}
                max={100000}
                step={1000}
                valueLabelDisplay="auto"
              />
              <Typography variant="caption">
                Min ₹10k – Max ₹1L
              </Typography>
            </Box>

            <Box>
              <Typography>Expected Return (%)</Typography>
              <Slider
                value={rate}
                onChange={(e, val) => setRate(val)}
                min={5}
                max={15}
                step={0.5}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box>
              <Typography>Time Period (Years)</Typography>
              <Slider
                value={years}
                onChange={(e, val) => setYears(val)}
                min={1}
                max={15}
                step={1}
                valueLabelDisplay="auto"
              />
            </Box>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Invest Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
