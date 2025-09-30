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
import Paper from '@mui/material/Paper';
// ----------------------------------------------------------------------

const FEATURES = [
  {
    title: 'Safety',
    description: 'Sovereign backing of G-Sec/Gilt regulation',
    icon: 'mdi:shield-check-outline',
    color: '#000000',
    backgroundColor : '#E1F0FF',

  },
  {
    title: 'Liquidity',
    description: 'Secondary market availability NSE & BSE trading',
    icon: 'mdi:swap-horizontal',
    color: '#000000',
    backgroundColor : '#E1F0FF',
  },
  {
    title: 'Types',
    description: 'Treasury Bills (short-term) Government Bonds (1-40 yrs)',
    icon: 'mdi:file-document-multiple-outline',
    color: '#5C5C5C',
    backgroundColor : '#f8f3f3ff',
  },
];

// ----------------------------------------------------------------------

export default function KeyFact() {
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
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
            Key Facts
          </Box>
        </Typography>
      </m.div>
      <Grid container spacing={4} justifyContent="center">
        {FEATURES.map((item, index) => (
          <Grid xs={12} sm={6} md={4} key={item.title}>
            <m.div >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 1,
                  textAlign: 'center',
                  mt: 7,
                  width: 350,                 // size of circle
                  height: 170,
                }}
              >
              <Box
                sx={{
                    width: 36,                 // size of circle
                    height: 36,
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
      {/* Features */}

    </Container>
  );
}
