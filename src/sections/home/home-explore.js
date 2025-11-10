import { Box, Typography, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function HomeExplore() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        mt: { xs: 8, md: 15 },
        // pt: { xs: 8, md: 15 },
        backgroundImage: 'url(/assets/images/home/explore/explore_background.svg)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Row 1: Wallet gif on left, text on right */}
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/home/explore/wallet.gif"
              alt="Wallet"
              sx={{
                display: 'block',
                mx: 'auto',
                width: { xs: 180, sm: 220, md: 280 },
                height: 'auto',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'center' }, px: { md: 4 } }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.primary, fontWeight: 300 }}
              >
                From tech giants to emerging startups, discover thousands of publicly listed
                companies. Use our powerful filters to search by sector, price range, or dividend
                yield — and compare performance at a glance.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                Start exploring today...
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Row 2: Text on left, money-bag gif on right */}
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'center' }, px: { md: 4 } }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.primary, fontWeight: 300 }}
              >
                From tech giants to emerging startups, discover thousands of publicly listed
                companies. Use our powerful filters to search by sector, price range, or dividend
                yield — and compare performance at a glance.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                Start exploring today...
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/home/explore/money-bag.gif"
              alt="Money bag"
              sx={{
                display: 'block',
                mx: 'auto',
                width: { xs: 200, sm: 260, md: 320 },
                height: 'auto',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
