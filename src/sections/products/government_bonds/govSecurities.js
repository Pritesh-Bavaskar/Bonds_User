import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { color } from 'highcharts';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    title: 'Safety',
    description: 'Sovereign guarantee ensures principal and interest payments',
    icon: 'mdi:shield-check-outline',
    color: '#84B1FF',
  },
  {
    title: 'Stable Returns',
    description: 'Predictable income through fixed coupon payments',
    icon: 'mdi:trending-up',
    color: '#00FF9D',
  },
  {
    title: 'Liquidity',
    description: 'Easy trading in secondary market with transparent pricing',
    icon: 'mdi:swap-horizontal',
    color: '#FFFFFF',
  },
];

// ----------------------------------------------------------------------

export default function GovSecurities() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 10 },
        textAlign: 'center',
      }}
    >

      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
            What Are
          </Box>{' '}
          <Box component="span" sx={{ color: 'orange' }}>
            Government Securities?
          </Box>
      </Typography>


      {/* Description */}
      <m.div>
        <Typography
          sx={{
            maxWidth: 1016,      // match the div width
            mx: 'auto',
            mt: 4,
            fontFamily: "Public Sans",
            color: theme.palette.text.secondary,
            height: 120,          // optional, match div height
          }}
        >
          Government Securities (G-Secs) are tradeable instruments issued by the central or state governments to meet their financing requirements. 
          These debt instruments are backed by the sovereign guarantee of the Government of India, making them the safest investment option available.
        </Typography>
      </m.div>


      {/* Features */}
      <Grid container spacing={4} justifyContent="center">
        {FEATURES.map((item, index) => (
          <Grid xs={12} sm={6} md={4} key={item.title}>
            <m.div >
              <Paper
                elevation={5}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 1,
                  textAlign: 'center',
                }}
              >
              <Box
                sx={{
                    width: 36,                 // size of circle
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'black',  // circle color
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 16px',     // spacing below icon
                  }}
                >
                  <Iconify
                    icon={item.icon}
                    width={30}                  // icon size
                    height={30}
                    color={item.color} // icon color
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            </m.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
