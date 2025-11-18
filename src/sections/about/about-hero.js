import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// components
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        // bgcolor: '#e8f1fc', // light blue background similar to screenshot
        backgroundImage: 'url(/assets/images/about/hero_about.png)',
      }}
    >
      <Container component={MotionContainer}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          spacing={5}
          maxwidth='1169px'
        >
          {/* Left Content */}
          <Box sx={{
            flex: 1,
          }}>
              <Typography
              variant="caption"
              sx={{
                display: 'inline-block',
                bgcolor: 'grey.200',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: 12,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Since 2015 – Trusted by 2,500+ Companies
            </Typography>
            

            <Typography
              variant="h1"
              sx={{
                width:{xs:'100%', md:'650px'},
                fontWeight: 700,
                fontFamily:'lato',
                mb: 3,
                // fontSize: { xs: 32, md: 40 },
              }}
            >
              Revolutionizing Global Bond <br />
              Markets Through <br />
              Technology
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: 400,
                fontSize: { xs: 16, md: 18 },
              }}
            >
              We’re the world’s leading digital bond issuance platform, connecting companies with investors through AI-powered technology and unmatched market expertise.
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="contained" size="large" sx={{ textTransform: 'none' }}>
                Learn More About Our Platform
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  textTransform: 'none',
                  bgcolor: 'common.white',
                  borderColor: 'grey.300',
                }}
              >
                Contact Our Team
              </Button>
            </Stack>
          </Box>

          {/* Right Image */}
          <Box
            component={m.div}
            variants={varFade().inUp}
            sx={{
              flex: 1,
              // width: '100%',
              maxWidth: 650, // Increased maxWidth
              minHeight: 420, // Increased minHeight for more height
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}  
          >
            <Box
              component="img"
              src="/assets/images/about/about.png"
              alt="Skyscrapers"
              sx={{
                width:"400px",
                height:'350px',             
                objectFit: 'fill', // Better fit for larger images
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
