import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import arrow from 'src/images/svg/arrow.svg';
import Button from '@mui/material/Button';
// components
import { MotionContainer, varFade } from 'src/components/animate';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

// --------------------------------------------------------------------

export default function AboutHero() {
  return (
    <Box
      sx={{
        // maxWidth: '1600px',
        mx: 'auto',
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url(/assets/images/products/Herosection.jpeg)',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            maxWidth: '1200px',
            // position: { md: 'absolute' },
            textAlign: { xs: 'left', md: 'left' },
            py: { xs: 0, md: 10 },
          }}
        >
          {/* Headline */}
          <TextAnimate
            text="Corporate"
            variants={varFade().inRight}
            variant="h1"
            sx={{
              fontFamily: 'Public Sans, sans-serif',
              fontWeight: 700,

              lineHeight: 1.2,
              color: 'warning.main',
              display: 'inline-block',
              mr: 1,
            }}
          />
          <TextAnimate
            text="Bonds"
            variants={varFade().inRight}
            sx={{
              fontFamily: 'Public Sans, sans-serif',
              fontWeight: 700,
              // fontSize: { xs: '32px', md: '64px', lg:'64px' },
              lineHeight: 1.2,
              color: 'primary.main',
              display: 'inline-block',
            }}
          />

          {/* Subtitle */}

          <m.div variants={varFade().inUp}>
            <Typography
              variant="subtitle1"
              sx={{
                mt: 1,
                width: { xs: '355px', md: '489px' },
                height: '70px',
                color: 'primary.main',
                fontFamily: 'Public Sans, sans-serif',
                lineHeight: '24px',
                letterSpacing: '0px',
                textAlign: { xs: 'left', md: 'left' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Institution-grade issuances crafted for investors seeking stable, high-yield returns.
            </Typography>
          </m.div>

          {/* CTA */}
          <m.div variants={varFade().inRight}>
            <Button
              component={RouterLink}
              to={paths.comingSoon}
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
              Explore Opportunities
              <Box component="Img" src={arrow} alt="arrow" sx={{ width: '25px', height: '25px' }} />
            </Button>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        color: 'primary.main',
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
