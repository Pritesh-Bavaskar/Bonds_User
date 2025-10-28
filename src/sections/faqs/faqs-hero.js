import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// components
import Iconify from 'src/components/iconify';
import { MotionContainer, varFade } from 'src/components/animate';
import { Grid, Typography } from '@mui/material';
import FaqsSearch from './faqs-search';

// ----------------------------------------------------------------------

export default function FaqsHero() {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        height: { md: '577px' },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(to right, #0D327D, #1B0102)',
        textAlign: { xs: 'center', md: 'left' },
      }}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* Main Text Section */}
      <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="column" sx={{ mt: '22px' }}>
          {/* Tagline */}
          <Typography
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid #FFFFFF',
              borderRadius: '50px',
              textAlign: 'center',
              padding: '12px 16px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              width: 'fit-content',
            }}
          >
            <Iconify icon="material-symbols:verified" sx={{ color: '#1877F2', fontSize: 24 }} />
            Get instant answers to your questions
          </Typography>

          {/* Heading */}
          <Typography
            variant="h1"
            sx={{
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              mt: '25px',
              fontSize: { xs: '32px', md: '56px' },
              textAlign: 'center',
            }}
          >
            Frequently Asked Questions
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h3"
            sx={{
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              pt: '36px',
              maxWidth: '900px',
              lineHeight: { xs: '32px', md: '50px' },
              textAlign: 'center',
              margin: '0 auto',
              fontSize: { xs: '18px', md: '28px' },
              px: { xs: 2, md: 0 },
            }}
          >
            Everything you need to know about our bond trading platform, from getting started to
            advanced features
          </Typography>
          <Grid
            container
            spacing={3}
            display="flex"
            justifyContent="center"
            sx={{
              width: { md: '100%', xs: '90%' },
              maxWidth: '600px',
              mt: '25px',
              mx: 'auto',
              columnGap: { md: 12 }, // space between items
              '& > .MuiGrid-item': {
                pl: { xs: 0, md: 'unset' },
                flex: { md: 1 }, // allow even sharing of width
              },
              flexWrap: { md: 'nowrap' },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  border: '1px solid #FFAB00',
                  borderRadius: '50px',
                  textAlign: 'center',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Iconify
                  icon="material-symbols:star-outline"
                  style={{ color: '#FFAB00', fontSize: 24 }}
                />
                23+ Questions Answered
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  border: '1px solid #073DFF',
                  borderRadius: '50px',
                  textAlign: 'center',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Iconify icon="solar:chat-round-bold" style={{ color: '#073DFF', fontSize: 28 }} />
                24/7 Support available
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', maxWidth: '842px', mt: '77px', px: { xs: '20px' } }}>
            <FaqsSearch onSearch={(val) => console.log('Searching for:', val)} />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
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
