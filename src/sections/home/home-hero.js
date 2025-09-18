import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// components
import Iconify from 'src/components/iconify';
import Carousel, { CarouselDots, useCarousel } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function HomeHero() {
  const heroImages = [
    '/assets/images/about/hero.jpg',
    '/assets/images/about/testimonials.jpg',
    '/assets/images/contact/hero.jpg',
  ];

  const carousel = useCarousel({
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    adaptiveHeight: false,
    ...CarouselDots({ rounded: true, sx: { mt: 2 } }),
  });

  return (
    <Box sx={{ py: { xs: 14, sm: 6, md: 20 }, px: 0 }}>
      <Container maxWidth="lg">
        <Stack
          spacing={{ xs: 3, sm: 4 }}
          alignItems="center"
          sx={{
            mx: 'auto',
            width: 1,
            maxWidth: { xs: 1, sm: 1, md: 1100 },
          }}
        >
          {/* Search bar */}
          <TextField
            fullWidth
            placeholder="Search any bond by ISIN or Issuer Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" width={22} />
                </InputAdornment>
              ),
            }}
            sx={{
              paddingBottom: { xs: 3, sm: 4, md: 6 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 999,
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows?.z8 || '0 2px 12px rgba(0,0,0,0.08)',
                '& fieldset': { borderColor: 'divider' },
                '&:hover fieldset': { borderColor: 'text.disabled' },
              },
              '& input': { py: { xs: 1.25, sm: 1.5 } },
              maxWidth: { xs: '100%', sm: 680, md: 800 },
            }}
          />

          {/* Carousel */}
          <Box sx={{ width: 1 }}>
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {heroImages.map((src, idx) => (
                <Box key={idx} >
                  <Box
                    component="img"
                    alt={`hero-${idx}`}
                    src={src}
                    sx={{
                      width: '100%',
                      height: { xs: 480, sm: 440, md: 400 },
                      objectFit: 'cover',
                      borderRadius: { xs: 2, sm: 2.5, md: 3 },
                      boxShadow: (theme) =>
                        theme.customShadows?.z24 || '0 8px 24px rgba(0,0,0,0.18)',
                    }}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
