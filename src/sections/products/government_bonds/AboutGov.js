import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MotionContainer, varFade } from 'src/components/animate';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

export default function AboutGov() {
  return (
    <Box
      sx={{
        mx: 'auto',
        // maxWidth:{md:'1300px'},
        width: '100%',
        height: { md: 560 },
        py: { xs: 0, md: 10 },
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
            // position: 'absolute',
            // top: { xs: '30%', md: '40%' },
            // left: { xs: '5%', md: '8%' },
            textAlign: { xs: 'center', md: 'left' },
            color: 'common.white',
            py: { xs: 10, md: 10 },
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
            <Typography variant="subtitle1" sx={{ mt: 2, maxWidth: 500, color: 'grey.200' }}>
              Institution-grade issuances crafted for investors seeking stable, high-yield returns.
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
                component={RouterLink}
                to={paths.bondLibrary}
                sx={{
                  mt: 3,
                  px: 3,
                  py: 1.2,
                  borderRadius: 1,
                  bgcolor: 'common.white',
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '16px',
                  textTransform: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Explore Government Bonds
              </Button>
              <Button
                component={RouterLink}
                to={paths.comingSoon}
                sx={{
                  mt: 3,
                  px: 3,
                  py: 1.2,
                  borderRadius: 1,
                  bgcolor: 'common.black',
                  fontWeight: 600,
                  fontSize: '16px',
                  textTransform: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: 'common.white',
                  '&:hover': {
                    bgcolor: 'grey.800',
                  },
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
