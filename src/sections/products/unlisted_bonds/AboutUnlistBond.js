import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MotionContainer, varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

export default function AboutUnListBond() {
  return (
    <Box
      sx={{
        height: { xs: 400, md: 560 },
        py: { xs: 10, md: 0 },
        mx: 'auto',
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url(/assets/images/products/unlisted_bond.jpeg)',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            textAlign: { xs: 'left', md: 'left' },
            color: 'common.white',
            py: { xs: 10, md: 20 },
          }}
        >
          <m.div variants={varFade().inRight}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', mt: -7 }}>
              <Box component="span" sx={{ color: 'orange' }}>
                Unlisted
              </Box>{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Bonds
              </Box>
            </Typography>
          </m.div>

          {/* Subtitle */}
          <m.div variants={varFade().inUp}>
            <Typography variant="subtitle1" sx={{ mt: 2, maxWidth: 400, color: 'primary.main' }}>
              Privately placed debt instruments offering higher yields but lower liquidity.
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
                Explore Unlisted Bond Opportunities
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
