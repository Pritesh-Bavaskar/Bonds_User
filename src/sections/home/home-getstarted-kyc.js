import React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Icon } from '@iconify/react';
import { useTheme, alpha } from '@mui/material/styles';
import { Button, Card, CardContent } from '@mui/material';
import TimelineView from '../_examples/mui/timeline-view';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import Iconify from 'src/components/iconify';
import ComponentBlock from '../_examples/component-block';
import Carousel, { CarouselDots, useCarousel } from 'src/components/carousel';

// ----------------------------------------------------------------------
const timelineSteps = [
  {
    icon: <Iconify icon="eva:folder-add-fill" width={24} />,
    title: 'Sign Up',
    description: 'Create the First Investor Metadata',
    position: 'left',
    color: '#f5f5f5',
  },
  {
    icon: <Iconify icon="eva:folder-add-fill" width={24} />,
    title: 'Upload Documents',
    description: 'Pan Card, Aadhaar Card and Cancelled Cheque',
    position: 'right',
    color: '#f5f5f5',
  },
  {
    icon: <Iconify icon="eva:folder-add-fill" width={24} />,
    title: 'Verify Identity',
    description: 'Complete KYC & eSign, Change PAN to Valid PAN',
    position: 'left',
    color: '#f5f5f5',
  },
  {
    icon: <Iconify icon="eva:folder-add-fill" width={24} />,
    title: 'Search & Filter Bonds',
    description: 'Sort and view the latest bonds on the My Bigacorns',
    position: 'right',
    color: '#f5f5f5',
  },
  {
    icon: <Iconify icon="eva:folder-add-fill" width={24} />,
    title: 'Start Listing Bonds',
    description: 'Does discover To a Listed plan, My bigacorns india May Change',
    position: 'left',
    color: '#f5f5f5',
  },
];

export default function HomeGetStartedKYC({ numberShow }) {
  const [tab, setTab] = React.useState('issuer');
  const theme = useTheme();

  const mobileCarousel = useCarousel({
    slidesToShow: 1,
    slidesToScroll: 1,
    ...CarouselDots({
      sx: { mt: 2 },
    }),
  });

  return (
    <Box component="section" sx={{ pt: { xs: 6, md: 15 } }}>
      <Container>
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            align="center"
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
          >
            Get Started
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 300,
              maxWidth: 900,
            }}
          >
            Completing your KYC is the first step toward investing seamlessly and securely on our
            platform. Our process is 100% paperless, quick, and compliant with SEBI regulations.
          </Typography>
        </Stack>

        <Container maxWidth="md" sx={{ py: 6 }}>
          <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
            {/* Background image at center */}
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '900px',
                transform: 'translateX(-50%)',
                backgroundImage: "url('/assets/icons/home/timeline_bg.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                opacity: 1,
                zIndex: 0,
              }}
            />
            {/* Vertical line */}
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 100,
                width: 2,
                bgcolor: '#e0e0e0',
                transform: 'translateX(-50%)',
                zIndex: 0,
              }}
            />

            {/* Timeline items */}
            {timelineSteps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: step.position === 'left' ? 'flex-start' : 'flex-end',
                  mb: 6,
                  position: 'relative',
                }}
              >
                <Card
                  sx={{
                    width: { xs: '80%', md: '35%' },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',

                    '&:hover': {
                      bgcolor: '#003289',
                      color: 'white', // makes children inherit
                    },

                    '&:hover .title': {
                      color: 'white',
                    },

                    '&:hover .desc': {
                      color: 'rgba(255,255,255,0.9)',
                    },

                    '&:hover .avatar': {
                      bgcolor: 'white',
                      color: '#003289',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Avatar
                      className="avatar"
                      sx={{
                        bgcolor: step.color,
                        color: 'text.secondary',
                        width: 48,
                        height: 48,
                        mx: 'auto',
                        mb: 2,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {step.icon}
                    </Avatar>

                    <Typography
                      variant="h6"
                      className="title"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="desc"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>

                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderBottom: '2px dotted #b0b0b0',
                    height: 0,
                    zIndex: 0,

                    ...(step.position === 'left'
                      ? {
                          left: 'calc(33% + 20px)', // card width + spacing
                          right: '50%',
                        }
                      : {
                          left: '50%',
                          right: 'calc(33% + 20px)',
                        }),
                  }}
                />
                {/* Center dot */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    bgcolor: '#90caf9',
                    border: '3px solid white',
                    zIndex: 2,
                    boxShadow: 1,
                  }}
                />
              </Box>
            ))}

            {/* Start button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{
                  px: 6,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                Start Investing
              </Button>
            </Box>
          </Box>
          {/* Mobile View Carousel */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, px: 2, mt: 4 }}>
            <Carousel ref={mobileCarousel.carouselRef} {...mobileCarousel.carouselSettings}>
              {timelineSteps.map((step, index) => (
                <Box key={index} sx={{ px: 1 }}>
                  <Card sx={{ width: '100%' }}>
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: step.color,
                          color: 'white',
                          width: 48,
                          height: 48,
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        {step.icon}
                      </Avatar>

                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {step.title}
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {step.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Carousel>
          </Box>
        </Container>
      </Container>
    </Box>
  );
}
