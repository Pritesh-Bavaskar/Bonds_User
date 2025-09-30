import { m } from 'framer-motion';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  const theme = useTheme();

  const renderImg = (
    <Image
      src="/assets/images/about/vision.jpg"
      alt="about-vision"
      overlay={alpha(theme.palette.grey[900], 0.48)}
    />
  );

  const renderLogo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 1,
        zIndex: 9,
        bottom: 0,
        opacity: 0.48,
        position: 'absolute',
        py: { xs: 1.5, md: 2.5 },
      }}
    >
      {['ibm', 'lya', 'spotify', 'netflix', 'hbo', 'amazon'].map((logo) => (
        <Box
          component={m.img}
          key={logo}
          variants={varFade().in}
          alt={logo}
          src={`/assets/icons/brands/ic_brand_${logo}.svg`}
          sx={{
            m: { xs: 1.5, md: 2.5 },
            height: { xs: 20, md: 32 },
          }}
        />
      ))}
    </Stack>
  );

  return (
    <Box
      sx={{
        pb: 10,
        position: 'relative',
        bgcolor: 'background.neutral',
        '&:before': {
          top: 0,
          left: 0,
          width: 1,
          content: "''",
          position: 'absolute',
          height: { xs: 80, md: 120 },
          bgcolor: 'background.default',
        },
      }}
    >
      <Container component={MotionViewport}>
        <Box
          sx={{
            mb: 10,
            borderRadius: 2,
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderImg}

          {renderLogo}

          <Fab sx={{ position: 'absolute', zIndex: 9 }}>
            <Iconify icon="solar:play-broken" width={24} />
          </Fab>
        </Box>

        <m.div variants={varFade().inUp}>
          <Typography variant="h5" sx={{
            px:20,
            maxwidth:'850px',
            fontWeight:700, 
            fontFamily:'public sans',
             textAlign: 'center' }}>
            Finance doesn’t have to be complicated. With our platform, you get the clarity and
            tools you need to explore opportunities, minimize risks, and grow your investments with confidence.
          </Typography>
        </m.div>
      </Container>
    </Box>
  );
}
