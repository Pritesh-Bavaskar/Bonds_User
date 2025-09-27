import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// components
import { MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function ListedJourney() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 6, md: 15 },
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          height: { xs: 'auto', md: 434 }, // auto on mobile, fixed on desktop
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: 'hsla(218, 100%, 22%, 1)',
          color: '#fff',
          p: { xs: 3, md: 4 },
          my: { xs: 4, md: 9 },
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ my: 2, fontSize: { xs: '22px', md: '32px' }, fontWeight: 700 }}
        >
          Start Your Listed Bond Investment Journey
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            my: 2,
            fontSize: { xs: '14px', md: '18px' },
            lineHeight: 1.6,
            px: { xs: 1, md: 0 },
          }}
        >
          Join thousands of investors who choose the transparency and liquidity of
          exchange-traded bonds.
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // stack on xs, row on sm+
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: '#00296B',
              fontWeight: 600,
              borderRadius: 1.5,
              px: 3,
              py: 1,
              boxShadow: 'none',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': { bgcolor: '#f3f6f9' },
            }}
            endIcon={<OpenInNewIcon sx={{ fontSize: 18 }} />}
            href="https://your-educational-resource-link.com"
            target="_blank"
          >
            Start Investing
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: '#00296B',
              fontWeight: 600,
              borderRadius: 1.5,
              px: 3,
              py: 1,
              boxShadow: 'none',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': { bgcolor: '#f3f6f9' },
            }}
          >
            View Bond Calculator
          </Button>
        </Box>

        {/* Features */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, md: 4 },
            mt: { xs: 4, md: 6 },
          }}
        >
          {['SEBI Regulated', 'Real-time Trading', 'Transparent Pricing'].map(
            (item) => (
              <Typography
                key={item}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'Public Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: { xs: '14px', md: '20px' },
                  lineHeight: '140%',
                  color: '#fff',
                }}
              >
                <Box
                  component="img"
                  src="/assets/Svg/tick1.svg"
                  sx={{ width: 20, height: 20, mr: 1 }}
                />
                {item}
              </Typography>
            )
          )}
        </Box>
      </Box>
    </Container>
  );
}
