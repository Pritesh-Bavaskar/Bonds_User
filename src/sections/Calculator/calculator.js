import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BondsCalculatorHero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: { xs: 400, md: 500 },
        backgroundImage: "url('/assets/calci/herobackimage.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 2, md: 4 },
        py: { xs: 5, md: 10 },
      }}
    >
      <Card
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 800,
          borderRadius: '20px',
          textAlign: 'center',
          p: { xs: 4, sm: 6, md: 8 },
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255,255,255,0.85)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        }}
      >
        <Grid container spacing={3} direction="column" alignItems="center">
          {/* Tag */}
          <Grid item>
            <Chip
              label="📊 Advanced Bond Analytics"
              sx={{
                background: 'linear-gradient(90deg, #FFAB00 0%, #FFC831 100%)',
                color: '#000',
                fontWeight: 600,
                fontSize: { xs: '0.75rem', md: '0.9rem' },
                borderRadius: '50px',
                px: 1.5,
                py: 0.5,
                boxShadow: '0px 3px 8px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>

          {/* Title */}
          <Grid item>
            <Typography
              sx={{
                fontSize: { xs: '30px', sm: '38px', md: '48px' },
                fontWeight: 600,
                color: '#000',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Bonds Calculator
            </Typography>
          </Grid>

          {/* Subtitle */}
          <Grid item>
            <Typography
              sx={{
                maxWidth: 600,
                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                fontWeight: 400,
                color: '#333',
                px: { xs: 1, sm: 3 },
              }}
            >
              Plan smarter, invest better with instant bond return projections.
            </Typography>
          </Grid>

          {/* Button */}
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate('/calculate')}
              size={isMobile ? 'medium' : 'large'}
              sx={{
                width: { xs: '200px', sm: '230px', md: '250px' },
                height: { xs: '50px', md: '57px' },
                // borderRadius: '50px',
                bgcolor: '#00328A',
                mt: 2,
                px: 3,
                py: 1,
                fontWeight: '700',
                fontSize: { xs: '16px', md: '18px' },
                fontFamily: 'Lato, sans-serif',
                gap: 1,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#00328A',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              <img
                src="/assets/Svg/vector.svg"
                alt="calci"
                style={{
                  width: '24px',
                  height: '32px',
                }}
              />
              Start Calculating
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
