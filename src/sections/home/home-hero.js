import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// components
import Iconify from 'src/components/iconify';
import Carousel, { CarouselDots, useCarousel } from 'src/components/carousel';
import { useSearchBonds } from 'src/api/bonds';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useDebounce } from 'src/hooks/use-debounce';
import { useRouter } from 'src/routes/hook/use-router';

// ----------------------------------------------------------------------

export default function HomeHero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  const {
    searchResults = [],
    searchLoading,
    searchError,
  } = useSearchBonds(debouncedSearchTerm || undefined, {
    enabled: !!debouncedSearchTerm && debouncedSearchTerm.length >= 3,
  });

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  }, []);

  const handleSuggestionClick = useCallback(
    (isinCode) => {
      router.push(`/bond-details/${encodeURIComponent(isinCode)}`);
      setShowSuggestions(false);
    },
    [router]
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          display="flex"
          alignItems="center"
          sx={{
            mx: 'auto',
            width: 1,
            maxWidth: { xs: 1, sm: 1, md: 1 },  
          }}
        >
          {/* Search bar with suggestions */}
          <Box sx={{ position: 'relative', width: '100%' }} ref={suggestionsRef}>
            <TextField
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search any bond by ISIN or Issuer Name"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" width={22} />
                  </InputAdornment>
                ),
                endAdornment: searchLoading && (
                  <InputAdornment position="end">
                    <Box
                      component="span"
                      sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center' }}
                    >
                      <Iconify icon="eos-icons:loading" width={20} />
                    </Box>
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
              maxWidth: { xs: '100%', sm: '100%', md: '100%' },
            }}
            />
            {showSuggestions && searchResults?.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 'calc(100% - 20px)', md: 'calc(100% - 40px)' }, // Adjust this value to fine-tune the position
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  bgcolor: 'background.paper',
                  borderRadius: '8px',
                  boxShadow: (theme) => theme.customShadows.z24,
                  maxHeight: 300,
                  overflowY: 'auto',
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderTop: 'none',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {searchResults.map((bond) => (
                  <Box
                    key={bond.isin_code}
                    onClick={() => handleSuggestionClick(bond.isin_code)}
                    sx={{
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                      '&:last-child': {
                        borderBottom: 'none',
                      },
                    }}
                  >
                    {bond.isin_code}
                    {bond.issuer_name && (
                      <Box
                        component="div"
                        sx={{ color: 'text.secondary', fontSize: '0.875rem', mt: 0.5 }}
                      >
                        {bond.issuer_name}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Carousel */}
          <Box sx={{ width: 1 }}>
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {heroImages.map((src, idx) => (
                <Box key={idx}>
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
