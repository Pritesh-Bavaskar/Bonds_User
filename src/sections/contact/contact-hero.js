// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function ContactHero() {

  return (
    <Box
      sx={{
        // Exact gradient as requested
        background: 'linear-gradient(89.91deg, #0062F5 -82.81%, #1A0000 97.82%)',
        py: { xs: 6, md: 8 },
      }}
    >
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          spacing={{ xs: 3, md: 5 }}
        >
          <Box sx={{ color: 'common.white', maxWidth: 640 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
              We’d Love to Connect with You
            </Typography>

            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Have questions or feedback? Our team is here to guide you. Write to us or call, and we’ll be
              happy to assist.
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: 'common.white',
              borderRadius: 2,
              boxShadow: 4,
              p: 1.5,
              width: { xs: '100%', md: 240 },
            }}
          >
            <Box
              component="img"
              alt="Contact Illustration"
              src="/assets/images/contact/hero.svg"
              sx={{
                width: '100%',
                height: { xs: 180, md: 200 },
                objectFit: 'contain',
                borderRadius: 1,
                display: 'block',
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
