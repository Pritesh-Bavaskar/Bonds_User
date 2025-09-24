import { Box, Typography, Container, Button, Stack, Divider } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

const WHY_ITEMS = [
  {
    id: 'acapl-1',
    title: '12.00% ACAPL',
    isin: 'INE08XP072B2',
    price: '₹ 96,156.90',
    coupon: '12.00%',
    yield: '16.0000%',
    ipFrequency: '₹ 96,156.90',
    maturityDate: '₹ 96,156.90',
    type: 'NCD TA...',
  },
  {
    id: 'acapl-2',
    title: '12.00% ACAPL',
    isin: 'INE08XP072B2',
    price: '₹ 96,156.90',
    coupon: '12.00%',
    yield: '16.0000%',
    ipFrequency: '₹ 96,156.90',
    maturityDate: '₹ 96,156.90',
    type: 'NCD TA...',
  },
  {
    id: 'acapl-3',
    title: '12.00% ACAPL',
    isin: 'INE08XP072B2',
    price: '₹ 96,156.90',
    coupon: '12.00%',
    yield: '16.0000%',
    ipFrequency: '₹ 96,156.90',
    maturityDate: '₹ 96,156.90',
    type: 'NCD TA...',
  },
  {
    id: 'acapl-4',
    title: '12.00% ACAPL',
    isin: 'INE08XP072B2',
    price: '₹ 96,156.90',
    coupon: '12.00%',
    yield: '16.0000%',
    ipFrequency: '₹ 96,156.90',
    maturityDate: '₹ 96,156.90',
    type: 'NCD TA...',
  },
  {
    id: 'acapl-5',
    title: '12.00% ACAPL',
    isin: 'INE08XP072B2',
    price: '₹ 96,156.90',
    coupon: '12.00%',
    yield: '16.0000%',
    ipFrequency: '₹ 96,156.90',
    maturityDate: '₹ 96,156.90',
    type: 'NCD TA...',
  },
];

function BondCard({ item }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mx: 1.25,
        borderRadius: 2,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        boxShadow: `0 4px 16px ${alpha(theme.palette.grey[500], 0.24)}`,
        border: `1px solid ${alpha(theme.palette.grey[500], 0.16)}`,
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2.25 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" color="primary" sx={{ fontWeight: 700 }}>
            Trending
          </Typography>
          <Box sx={{ width: 24, height: 24, bgcolor: alpha(theme.palette.primary.main, 0.08), borderRadius: '50%' }} />
        </Stack>

        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">14..</Typography>

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="caption" color="text.secondary">ISIN</Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.isin}</Typography>
      </Box>

      <Box sx={{ bgcolor: theme.palette.primary.dark, color: '#fff', mt: 'auto', p: 2.25 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 1.25 }}>
          <Stack spacing={0.25}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>Price</Typography>
            <Typography variant="subtitle2">{item.price}</Typography>
          </Stack>
          <Stack spacing={0.25}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>Yield</Typography>
            <Typography variant="subtitle2">{item.yield}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 1.25 }}>
          <Stack spacing={0.25}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>IP Frequency</Typography>
            <Typography variant="subtitle2">{item.ipFrequency}</Typography>
          </Stack>
          <Stack spacing={0.25}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>Maturity Date</Typography>
            <Typography variant="subtitle2">{item.maturityDate}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption">Type Of Bond {item.type}</Typography>
          <Button size="small" variant="contained" color="info" sx={{ bgcolor: '#fff', color: theme.palette.primary.dark, '&:hover': { bgcolor: alpha('#fff', 0.9) } }}>
            More
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default function HomeWhyBonds() {
  const theme = useTheme();

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
    <Box component="section" sx={{ py: { xs: 6, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant='h1'
          align="center"
          sx={{ fontWeight: 700, color: theme.palette.primary.main }}
        >
          Why Choose Us?
        </Typography>

        {/* Subtitle */}
        <Typography
          align="center"
          variant="h6"
          color="#18191B"
          sx={{ mt: 2, mx: 'auto', maxWidth: 900, fontWeight: 300 }}
        >
          We bring together live market data, bond listings, and stock insights in one intuitive platform. Whether you’re a new investor or an experienced trader, our goal is to make exploring financial markets easier, faster, and smarter.
        </Typography>

        {/* Carousel */}
        <Box sx={{ position: 'relative', mt: { xs: 4, md: 8 } }}>
          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{ sx: { left: 16 } }}
            rightButtonProps={{ sx: { right: 16 } }}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {WHY_ITEMS.map((item) => (
                <Box key={item.id} sx={{ px: 1 }}>
                  <BondCard item={item} />
                </Box>
              ))}
            </Carousel>
          </CarouselArrows>
        </Box>

        {/* View all Button */}
        <Stack alignItems="center" sx={{ mt: { xs: 4, md: 6 } }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '8px',
              fontWeight: 700,
              fontStyle: 'bold',
              fontSize: '14px',
              px: '24px',
              py: '6px',
            }}
          >
            View all
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
