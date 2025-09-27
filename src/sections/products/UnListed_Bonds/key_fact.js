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
    title: 'Investor Eligibility',
    description: 'QIBs, HNIs, retail investors (₹2 lakh+ minimum typically)',
    icon: 'iconamoon:profile-thin',
    color: '#00A76F',
    backgroundColor: '#D0FAE5',
  },
  {
    title: 'Yield Range',
    description: 'Often higher than listed bonds due to illiquidity premium',
    icon: 'lsicon:percent-outline',   // ✅ fixed icon set + spelling
    color: '#FF2323',
    backgroundColor: '#F1F5F9',
  },
  {
    title: 'Liquidity',
    description: 'Private OTC market — Less frequent trading',
    icon: 'ph:pulse-light',        // Iconify Phosphor icon
    color: '#5C5C5C',
    backgroundColor: '#FFE2E2',
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
        {FEATURES.map((item) => (
          <Grid xs={12} sm={6} md={4} key={item.title}>
            <m.div variants={varFade().inUp}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  textAlign: 'center',
                  mt: 7,
                  maxWidth: 350,
                  maxHeight: 450,
                  mx: 'auto',
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: item.backgroundColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <Iconify icon={item.icon} width={25} height={25} color={item.color} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', lineHeight: 1.6,height:50 }}>
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
