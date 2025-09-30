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
    title: 'Higher Yields',
    description: 'Compensation for illiquidity and credit risk through enhanced returns',
    icon: 'carbon:growth',
    color: '##09966',
    backgroundColor: '#D0FAE5',
  },
  {
    title: 'Structured Terms',
    description: 'Customized terms and tenures tailored to investor requirements',
    icon: 'weui:setting-outlined',
    color: '#000000',
    backgroundColor: '#E4E4E4',
  },
  {
    title: 'Limited Liquidity',
    description: 'Private OTC market with restricted secondary trading opportunities',
    icon: 'mynaui:lock',
    color: '#FF1100',
    backgroundColor: '#FFE1E1',
  },
];

// ----------------------------------------------------------------------

export default function UnListBonds() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: 'center',
      }}
    >

      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
            What Are 
          </Box>{' '}
          <Box component="span" sx={{ color: 'orange' }}>
            Unlisted Bonds?
          </Box>
      </Typography>


      {/* Description */}
      <m.div>
        <Typography variant="subtitle1" align="center"
          sx={{
            maxWidth: 1016,      // match the div width
            mx: 'auto',
            mt: 3,
            height: "auto", 
            fontWeight:500,         // optional, match div height
          }}
        >
          Unlisted bonds are debt securities not traded on formal exchanges and sold privately through over-the-counter (OTC) markets. These instruments are typically offered to institutional investors, High Net Worth Individuals (HNIs), and qualified retail investors through private placements.
        </Typography>
      </m.div>

      <Grid container spacing={4} justifyContent="center">
        {FEATURES.map((item, index) => (
          <Grid xs={12} sm={6} md={4} key={item.title}>
            <m.div >
              <Paper
                elevation={5}
                sx={{
                  p: 4,
                  height: {xs:200, md: 200 },
                  borderRadius: 1,
                  textAlign: 'center',
                  mt: 4,
                }}
              >
              <Box
                sx={{
                    width: 50,                 // size of circle
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: item.backgroundColor,  // circle color
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 16px',     // spacing below icon
                  }}
                >
                  <Iconify
                    icon={item.icon}
                    width={25}                  // icon size
                    height={25}
                    color={item.color} // icon color
                  />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
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
