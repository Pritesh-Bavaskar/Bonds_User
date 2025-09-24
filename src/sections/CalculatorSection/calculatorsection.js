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
import OvalImg from 'src/images/oval.png';
import SearchIcon from "@mui/icons-material/Search";

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
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Typography
        sx={{
          fontSize: { xs: 28, md: 35 },
          fontWeight: 600,
          color: "primary.main",
          textAlign: "left",
          pl: '10%',
          mb: 1,
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
          width: "70%",
          height: { xs: 300, md: 820 },
          objectFit: "cover",
          py: { xs: 3, md: 4 },
          bgcolor: '#fff',
        }}
      />

      {/* Small black pill over image */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "8%",
          width: { xs: "40%", md: "25%" },
          height: 50,
          bgcolor: "#fff",
          color: "red",
          borderRadius: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          zIndex: 2,
          px: 4,
        }}
      >
        <SearchIcon sx={{ color: "black" }} />
        <Typography
          sx={{
            fontSize: { xs: 14, md: 16 },
            fontWeight: 500,
            color:'black',
          }}
        >
          ISIN NUMBER 
        </Typography>
      </Box>

      {/* Calculator Box - overlays the image */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "20%", md: "25%" },
          left: "45%",
          transform: "translateX(-50%)",
          width: { xs: "90%", md: "75%" },
          bgcolor: "#f9f9f9",
          // p: { xs: 3, md: 1 }, 
          py: { xs: 3, md: 6 },
          pr: { xs: 3, md: 16 },
          borderRadius: 3,
          boxShadow: 3,
          zIndex: 2,

        }}
      >

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: 1200, mx: "auto" }}
        >


          {/* Left Side - Chart */}
          <Grid item xs={12} md={6} textAlign="center">
            <Typography variant="h6">Your Total Amount</Typography>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4, }}>
              <Box>
                <Typography>Monthly Investment</Typography>
                <Slider
                  value={investment}
                  onChange={(_, val) => setInvestment(val)}
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
                  onChange={(_, val) => setRate(val)}
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
                  onChange={(_, val) => setYears(val)}
                  min={1}
                  max={15}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Button
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "#fff",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                Invest Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
