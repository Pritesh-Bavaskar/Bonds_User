import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function AboutGov() {
  return (
    <Box
      sx={{
        mx:'auto',
        maxWidth:{md:'1300px'},
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url(/assets/images/products/gov_image.jpg)',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '30%', md: '40%' },
            left: { xs: '5%', md: '8%' },
            textAlign: { xs: 'center', md: 'left' },
            color: 'common.white',
          }}
        >
          {/* Heading */}
          <m.div variants={varFade().inRight}>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              <Box component="span" sx={{ color: 'orange' }}>
                Government
              </Box>{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Securities
              </Box>
            </Typography>
          </m.div>

          {/* Subtitle */}
          <m.div variants={varFade().inUp}>
            <Typography
              variant="subtitle1"
              sx={{ mt: 2, maxWidth: 500, color: 'grey.200' }}
            >
              Institution-grade issuances crafted for investors
              seeking stable, high-yield returns.
            </Typography>
          </m.div>

          {/* Buttons */}
          <m.div variants={varFade().inUp}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mt: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'common.white',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'grey.200' },
                }}
              >
                Explore Government Bond
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'common.black',
                  color: 'common.white',
                  '&:hover': { bgcolor: 'grey.800' },
                }}
              >
                Learn More
              </Button>
            </Stack>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
