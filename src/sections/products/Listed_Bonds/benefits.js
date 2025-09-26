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
    title: 'High Liquidity',
    description: 'Trade bonds easily during market hours with immediate settlement and transparent pricing.',
    icon: 'carbon:growth',
  },
  {
    title: 'Transparent Pricing',
    description: 'Real-time price discovery through exchange mechanisms ensures fair market value.',
    icon: 'weui:setting-outlined',
  },
  {
    title: 'Regulatory Oversight',
    description: 'SEBI regulation provides investor protection and standardized market practices.',
    icon: 'line-md:security',
  },
  {
    title: 'Lower Credit Risk',
    description: 'Listed issuers undergo stringent disclosure requirements and credit assessments.',
    icon: 'bytesize:portfolio',
  },
  {
    title: 'Retail Accessibility',
    description: 'Lower minimum investment amounts make bonds accessible to individual investors.',
    icon: 'ph:hand-heart-light', 
  },
  {
    title: 'Exchange Discovery',
    description: 'Efficient price discovery through organized exchange trading mechanisms.',
    icon: 'heroicons:document-check',
  },
];
// ----------------------------------------------------------------------

export default function Benefits() {
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
      <m.div variants={varFade().inRight}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
           Advantages of Listed Bonds
          </Box>
        </Typography>
      </m.div>

      {/* Subtitle */}
      <m.div variants={varFade().inUp}>
        <Typography
        variant='subtitle1'
          sx={{
            maxWidth: 656,
            height:48,
            mx: 'auto',
            mb: 8,
            mt: 2,
            color: 'black',
          }}
        >
        Discover why listed bonds offer superior benefits for modern investors seeking transparency and liquidity.
        </Typography>
      </m.div>

      {/* Features */}
      <Grid container spacing={4} justifyContent="center">
        {FEATURES.map((item, index) => (
          <Grid xs={12} sm={6} md={4} key={item.title}>
            <m.div variants={varFade().inUp}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  height: 210,
                }}
              >
                {/* Icon with circle */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: '#E9F4FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                  }}
                >
                  <Iconify
                    icon={item.icon}
                    width={28}
                    height={28}
                    color="black"
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ height: 50 }}>
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
