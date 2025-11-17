import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Button, Stack, Divider } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';
import BondLibraryCardGrid from 'src/components/bond-library-card/bond-library-card-grid';

// ----------------------------------------------------------------------

const WHY_ITEMS = [
  {
    id: '1',
    title: 'Government of India 10Y Bond',
    isin: 'INE002A07KM3',
    price: '₹101.50',
    yield: '7.25%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '15/05/2033',
    type: 'Sovereign',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '2',
    title: 'HDFC Bank Limited',
    isin: 'INE040A07CM2',
    price: '₹102.75',
    yield: '8.10%',
    ipFrequency: 'Annual',
    maturityDate: '10/12/2028',
    type: 'Corporate',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '3',
    title: 'Reliance Industries Limited',
    isin: 'INE002A07KM4',
    price: '₹100.25',
    yield: '7.85%',
    ipFrequency: 'Quarterly',
    maturityDate: '22/08/2030',
    type: 'Corporate',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '4',
    title: 'State Bank of India',
    isin: 'INE002A07KM5',
    price: '₹99.90',
    yield: '7.95%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '05/11/2032',
    type: 'PSU',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '5',
    title: 'Tata Motors Limited',
    isin: 'INE002A07KM6',
    price: '₹98.50',
    yield: '8.45%',
    ipFrequency: 'Annual',
    maturityDate: '18/07/2029',
    type: 'Corporate',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
  {
    id: '6',
    title: 'National Highways Authority',
    isin: 'INE002A07KM7',
    price: '₹100.00',
    yield: '7.60%',
    ipFrequency: 'Semi-Annual',
    maturityDate: '30/09/2035',
    type: 'Infrastructure',
    asapl: '12.00%',
    date: '14 AUG 20',
    brandLogo: '/assets/icons/bond-library/company.svg',
  },
];

export default function HomeWhyBonds({ isDetails, bonds }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/bond-library');
  };

  const carousel = useCarousel({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 4 } },
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  });

  return (
    <Box component="section" sx={{ pt: { xs: 6, md: 15} }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="h1"
          align={isDetails ? 'left' : 'center'}
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            display: 'flex',
            justifyContent: isDetails ? 'flex-start' : 'center',
          }}
        >
          {isDetails ? 'Similar Bonds' : 'Why Choose Us?'}
        </Typography>

        {/* Subtitle */}
        <Typography
          align="center"
          variant="h5"
          color="#637381"
          sx={{
            mt: 2,
            mx: 'auto',
            px:'20px',
            maxWidth: 'lg',
            fontWeight: 300,
            display: isDetails ? 'none' : 'block',
          }}
        >
          We bring together live market data, bond listings, and stock insights in one intuitive
          platform. Whether you’re a new investor or an experienced trader, our goal is to make
          exploring financial markets easier, faster, and smarter.
        </Typography>

        {/* Carousel */}
        <Box sx={{ position: 'relative', mt: { xs: 4, md: 8 } }}>
          {Array.isArray(bonds) && bonds.length > 0 ? (
            <CarouselArrows
              onNext={carousel.onNext}
              onPrev={carousel.onPrev}
              leftButtonProps={{ sx: { left: -32, display: { xs: 'none', md: 'inline-flex' } } }}
              rightButtonProps={{ sx: { right: -32, display: { xs: 'none', md: 'inline-flex' } } }}
              spacing={4}
            >
              <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                {bonds.map((item) => (
                  <Box key={item.isin_code || item.id} sx={{ px: 1, width: '100%' }}>
                    <BondLibraryCardGrid item={item} />
                  </Box>
                ))}
              </Carousel>
            </CarouselArrows>
          ) : (
            <Box
              sx={{
                minHeight: 250,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'text.secondary',
              }}
            >
              Loading featured bonds...
            </Box>
          )}
        </Box>

        {/* View all Button */}
        <Stack
          alignItems="center"
          sx={{ mt: { xs: 4, md: 6 }, display: isDetails ? 'none' : 'flex' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewAllClick}
            sx={{
              borderRadius: '8px',
              fontWeight: 700,
              fontStyle: 'bold',
              fontSize: '14px',
              px: '24px',
              py: '6px',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            View all
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

HomeWhyBonds.propTypes = {
  isDetails: PropTypes.bool,
  bonds: PropTypes.array,
};
