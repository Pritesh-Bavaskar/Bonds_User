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
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

const FEATURES = [
  {
    title: 'Open Brokerage Account',
    description:
      'Register with a SEBI-registered broker or investment platform that offers bond trading.',
    key: 'KYC documents required',
    icon: 'material-symbols-light:person-outline-rounded',
  },
  {
    title: 'Browse & Filter Bonds',
    description: 'Explore listed bonds by issuer, credit rating, yield, and maturity period.',
    key: 'Compare options easily',
    icon: 'mingcute:search-line',
  },
  {
    title: 'Trade During Market Hours',
    description: 'Place buy/sell orders during stock exchange hours (9:15 AM - 3:30 PM).',
    key: 'Real-time execution',
    icon: 'icons8:shopping-cart',
  },
  {
    title: 'Monitor & Trade',
    description: 'Track performance, collect interest payments, and trade or hold to maturity.',
    key: 'Flexible exit options',
    icon: 'streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow',
  },
];

// ----------------------------------------------------------------------

export default function Investment() {
  const theme = useTheme();

  return (
    <Box>
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
          textAlign: 'center',
        }}
      >
        {/* Title */}
        <m.div variants={varFade().inRight}>
          <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
            <Box component="span" sx={{ color: 'primary.main' }}>
              How to Invest in Listed Bonds
            </Box>
          </Typography>
        </m.div>

        {/* Subtitle */}
        <m.div variants={varFade().inUp}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              color: 'black',
              height: 24,
              mx: 'auto',
              mt: 3,
              mb: 4,
            }}
          >
            Simple steps to start your listed bond investment journey.
          </Typography>
        </m.div>

        {/* Features */}
        <Grid container spacing={4} justifyContent="center">
          {FEATURES.map((item, index) => (
            <Grid xs={12} sm={6} md={3} key={item.title}>
              <m.div variants={varFade().inUp}>
                <Box
                  sx={{
                    p: 4,
                    height: '290px',
                    textAlign: 'center',

                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {/* Icon with circle */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: ' hsla(213, 100%, 90%, 1)',
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
                      color={theme.palette.primary.main}
                    />
                  </Box>

                  {/* Title */}
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {item.title}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" sx={{ height: 50 }}>
                    {item.description}
                  </Typography>

                  <Button variant="body2" color="text.secondary" sx={{ height: 50, mt: 2 }}>
                    {item.key}
                  </Button>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box
        sx={{
          height: 171,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: 'hsla(218, 100%, 22%, 1)',
          color: '#fff',
          p: 4,
          mt: 6,
          pt: 3,
        }}
      >
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, pt: 3 }}>
            <Box
              component="Img"
              src="/assets/Svg/rocket.svg"
              sx={{ width: '20px', height: '20px', display: 'flex', flexDirection: 'row' }}
            />
            <Typography sx={{ textAlign: 'left' }}>Ready to Start?</Typography>
          </Box>
          <Typography sx={{ textAlign: 'left' }}>
            Access listed bonds through any SEBI-registered broker or investment platform.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="contained"
              component={RouterLink}
              to={paths.bondLibrary}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: '#fff',
                color: '#00296B',
                fontWeight: 600,
                borderRadius: 1.5,
                width: '150px',
                my: 2,
                px: 2,
                py: 1,
                boxShadow: 'none',
                '&:hover': { bgcolor: '#f3f6f9' },
              }}
              endIcon={<OpenInNewIcon sx={{ fontSize: 18 }} />}
            >
              Find Bonds
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
