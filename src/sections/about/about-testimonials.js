import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const testimonials = [
  {
    id: 1,
    quote:
      '“We issued our first green bonds through BondIssuer Pro and the experience exceeded all expectations. The ESG-focused investor network and detailed analytics gave us confidence throughout the process.”',
    bondAmount: '500M',
    pricingNote: '✓ 30 bps better pricing vs. traditional methods',
    rating: 5,
    name: 'Lucian Obrien',
    date: '12 Jan 2022',
    avatarUrl: '/assets/Svg/avatar.svg',
  },
  {
    id: 2,
    quote:
      '“We issued our first green bonds through BondIssuer Pro and the experience exceeded all expectations. The ESG-focused investor network and detailed analytics gave us confidence throughout the process.”',
    bondAmount: '750M',
    pricingNote: '✓ 30 bps better pricing vs. traditional methods',
    rating: 5,
    name: 'Sarah Linton',
    date: '23 Feb 2022',
   avatarUrl: '/assets/Svg/avatar.svg',
  },
  {
    id: 3,
    quote:
      '“We issued our first green bonds through BondIssuer Pro and the experience exceeded all expectations. The ESG-focused investor network and detailed analytics gave us confidence throughout the process.”',
    bondAmount: '300M',
    pricingNote: '✓ 30 bps better pricing vs. traditional methods',
    rating: 4,
    name: 'Marcus Chen',
    date: '10 Mar 2022',
    avatarUrl: '/assets/Svg/avatar.svg',
  },
  {
    id: 4,
    quote:
      '“We issued our first green bonds through BondIssuer Pro and the experience exceeded all expectations. The ESG-focused investor network and detailed analytics gave us confidence throughout the process.”',
     
    bondAmount: '1B+',
    pricingNote: ' ✓ 30 bps better pricing vs. traditional methods',
    rating: 5,
    name: 'Emily Walker',
    date: '05 Apr 2022',
    avatarUrl: '/assets/Svg/avatar.svg',
  },
];

// ----------------------------------------------------------------------

export default function TestimonialsSection() {
  const carousel = useCarousel({
    infinite: false,
    slidesToShow: 4,
    responsive: [
      { breakpoint: 1279, settings: { slidesToShow: 3 } },
      { breakpoint: 959, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  });

  return (
    <Box
      sx={{
        backgroundColor: '#0c2444', // Deep blue
        
        color: 'common.white',
        py: { xs: 10, md: 15 },
      }}
    >
      <Container component={MotionViewport} sx={{ textAlign: 'center' }}>
        <m.div variants={varFade().inDown}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Join Our Success Stories
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography
            sx={{
              mt: 2,
              mx: 'auto',
              maxWidth: 680,
              color: 'grey.400',
              fontSize: { xs: 16, md: 18 },
            }}
          >
            Ready to experience the same success as our clients? Join thousands of companies and
            investors who trust BondsIssuer Pro for their fixed income needs.
          </Typography>
        </m.div>

        {/* Carousel */}
        <Box sx={{ position: 'relative', mt: 6 }}>
          <CarouselArrows
            filled
            shape="rounded"
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{
              sx: {
                left: 24,
                ...(testimonials.length < 5 && { display: 'none' }),
              },
            }}
            rightButtonProps={{
              sx: {
                right: 24,
                ...(testimonials.length < 5 && { display: 'none' }),
              },
            }}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {testimonials.map((item) => (
                <Box key={item.id} component={m.div} variants={varFade().in} sx={{ px: 1.5 }}>
                  <TestimonialCard testimonial={item} />
                </Box>
              ))}
            </Carousel>
          </CarouselArrows>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TestimonialCard({ testimonial }) {
  const { quote, bondAmount, pricingNote, rating, name, date, avatarUrl } = testimonial;

  return (
    <Card
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(10px)',
        color: 'common.white',
        borderRadius: 2,
        p: 3,
        height: '100%',
        minHeight: 400, // Ensures uniform height
        display: 'flex',
        flexDirection: 'column',  
        justifyContent: 'left',
      }}
    >
      <Typography
        variant="h6"
        sx={{display:'flex',textAlign:'left', fontSize: { xs: 12, md: 14 }, fontWeight:400, fontStyle: 'regular', mb: 3 }}
      >
        {quote}
      </Typography>

      <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.5 }}>
        Bond Amount: {bondAmount}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          fontSize: 13,
          color: 'grey.400',
          display: 'block',
          mb: 2,
        }}
      >
         {pricingNote}
      </Typography>

      <Rating value={rating} readOnly sx={{ mb: 2 }} />

      <Stack direction="row" spacing={2} alignItems="center" mt="auto">
        <Image
          alt={name}
          src={avatarUrl}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
          }}
        />
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.400' }}>
            {date}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.object,
};
