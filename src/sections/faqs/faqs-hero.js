import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// components
import Iconify from 'src/components/iconify';
import { MotionContainer, varFade } from 'src/components/animate';
import { Typography } from '@mui/material';
import FaqsSearch from './faqs-search';

// ----------------------------------------------------------------------

export default function FaqsHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: { md: '577px' },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(to right, #0D327D, #1B0102)',
      }}
    >
      <Stack direction={'column'} sx={{ mt: '22px' }}>
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
          }}
        >
          <Iconify icon="material-symbols:verified" sx={{ color: '#1877F2', fontSize: 24 }} />
          Get instant answers to your questions
        </Typography>
        <Typography
          variant="h1"
          sx={{ color: '#FFFFFF', display: 'flex', justifyContent: 'center', mt: '25px' }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            pt: '36px',
            maxWidth: '900px',
            lineHeight: '50px',
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          Everything you need to know about our bond trading platform, from getting started to
          advanced features
        </Typography>
        <Stack
          direction="row"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: '25px', columnGap: '95px' }}
        >
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
        </Stack>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: '77px', 
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '842px' }}>
            <FaqsSearch
              onSearch={(val) => console.log('Searching for:', val)}
            />
          </Box>
        </Box>
      </Stack>
      {/* <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <div>
            <TextAnimate text="How" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
            <br />

            <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
              <TextAnimate text="can" />
              <TextAnimate text="we" />
              <TextAnimate text="help" />
              <TextAnimate text="you?" />
            </Stack>
          </div>

          <m.div variants={varFade().in}>
            <TextField
              fullWidth
              placeholder="Search support..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 5,
                maxWidth: 360,
                [`& .${outlinedInputClasses.root}`]: {
                  bgcolor: 'common.white',
                },
                [`& .${outlinedInputClasses.input}`]: {
                  typography: 'subtitle1',
                },
              }}
            />
          </m.div>
        </Box>
      </Container> */}
    </Box>
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
