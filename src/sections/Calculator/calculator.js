import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { Calculate } from "@mui/icons";

export default function BondsCalculatorHero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 320, md: 444 },
        backgroundImage: "url('/assets/calci/herobackimage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, md: 2}, 
          width:'763px',
          height:'288px',
          maxWidth: 780,
          textAlign: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        <Grid container spacing={2} direction="column" alignItems="center">
          {/* Tag */}
          <Grid item>
            <Chip
              label="📊 Advanced Bond Analytics"
              //   color="default"   
              sx={{
                color: 'brown',
                bgcolor: "warning.main",
                fontWeight: 500,
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                "&: hover": {
                  bgcolor: 'warning.light',
                }
              }}
            />
          </Grid>

          {/* Title */}
          <Grid item>
            <Typography
              fontWeight={700}
              gutterBottom
              sx={{
                fontSize: '48px',
                fontWeight: '700',
                fontFamily: 'lato',
              }}
            >
              Bonds Calculator
            </Typography>
          </Grid>

          {/* Subtitle */}
          <Grid item>
            <Typography
              sx={{
                maxWidth: 751,           
                fontSize: '20px',
                fontWeight: '500',
                fontFamily: 'lato',
                color: "#000000",
              }}
            >
              Plan smarter, invest better with instant bond return projections.
            </Typography>
          </Grid>

          {/* Button */}
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate("/calculate")}
              size={isMobile ? "medium" : "large"}
              sx={{
                width:'252px',
                height:'57px',
                borderRadius:'5px',
                bgcolor: 'primary.main',
                mt: 1,
                px: 4,
                py: 1.2,
                fontWeight: "800",
                fontSize: '20px',
                fontFamily: 'lato',
                lineHeight:'82%',
                gap: 1,
                "&:hover": {
                  bgcolor: 'primary.main',
                  bordershadow: 'none',
                }
              }}
            >
              <img src='/assets/Svg/vector.svg' alt='calci' style={{ width: "26px", height: '35px', }} />
              Start Calculating
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
