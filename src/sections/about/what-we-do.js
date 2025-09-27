import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    title: 'AI-Powered Analytics',
    description: 'Advanced market analysis and pricing optimization using machine learning algorithms.',
    icon: 'garden:growth-chart-fill-12',
    bgColor: '#CCE3FF',
    color: '#1877F2',

  },
  {
    title: 'AI-Powered Analytics',
    description: 'Connect with 50,000+ institutional and retail investors across 35 countries.',
    icon: 'lsicon:user-crowd-filled',
    bgColor: '#DBFCE7',
    color: '#00A76F',

  },
  {
    title: 'AI-Powered Analytics',
    description: 'Bank-grade security with full regulatory compliance across all major markets.',
    icon: 'wpf:security-checked',
    bgColor: '#E9D5FF',
    color: '#8A38F5',
  },
];

// ----------------------------------------------------------------------

export default function WhatWeDo() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: 'center',

        
      }}
    >
      {/* Title */}
      <m.div variants={varFade().inRight  } >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left', ml: { xs: 'auto', md: 3} }}>
          What{' '}
          <Box component="span" sx={{ color: 'primary.main', display: 'inline' }}>
            We Do
          </Box>
        </Typography>
      </m.div>

      {/* Subtitle */}
      <m.div variants={varFade().inUp}>
        <Typography
          variant="h5"
          sx={{
            maxWidth: 800,
            color: 'text.secondary',
            textAlign: 'left',
            mb: 6,
            ml: { xs: 'auto', md: 3}
          }}
        >
          Comprehensive bond issuance platform with end-to-end solutions
        </Typography>
      </m.div>

      <Grid container spacing={4} justifyContent="flex-start" alignItems="center"  >
        {FEATURES.map((item, index) => (
          <Grid xs={12} sm={6} md={4} key={index}>
            <m.div variants={varFade().inUp}>
              <Box
                sx={{
                  p: 3,
                  textAlign: 'left',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 0,
                  minHeight: 200,
                  ml: { xs: 'auto', md: 0 },
                }}
              >
                {/* Icon with colored square */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    backgroundColor: item.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Iconify
                    icon={item.icon}
                    width={24}
                    height={24}
                    color={item.color}
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography variant="subtitle1" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            </m.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}