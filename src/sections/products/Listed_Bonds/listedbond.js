import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import arrow from 'src/images/svg/arrow.svg';

// components
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function Listedbond() {
  return (
    <Box
    sx={{
          maxWidth:'1600px',
          mx:'auto',
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
          'url(/assets/images/about/listedbond.jpg)',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            left: { md: 200 },
            top: { md: 40 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          {/* Headline */}
          <TextAnimate
            text="Listed"
            variants={varFade().inRight}
            sx={{
              fontFamily: 'Public Sans, sans-serif',
              fontWeight: 700,
              fontSize: { xs: '32px', md: '64px',lg:'64px' },
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
              fontSize: { xs: '32px', md: '64px', lg:'64px' },
              lineHeight: 1.2,
              color: 'primary.main',
              display: 'inline-block',
            }}
          />

          {/* Subtitle */}

          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                mt:1,
                width:'489px',
                height:'70px',
                color: "primary.main",
                fontFamily: "Public Sans, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "0px",
                textAlign: "left",
                display: "flex",
                alignItems: "center",   // vertical alignment
                justifyContent: "center", // horizontal alignment
              }}
            >
              Trade sovereign & corporate bonds with transparency and ease.
            </Typography>
          </m.div>


          {/* CTA */}
          <m.div variants={varFade().inRight}>
            <Typography
              variant="button"
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
              Explore Listed Bonds
             <Box
             component='Img'
             src={arrow}
             alt='arrow'
             sx={{ width:'25px', height:'25px'}}

             />
            </Typography>
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
        typography: 'h4',
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
