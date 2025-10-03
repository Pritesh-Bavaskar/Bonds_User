import { Box, Button, Grid, Stack, Typography } from '@mui/material';

export default function NewsInsightQuestion() {
  return (
    <Grid container justifyContent="center">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ textAlign: 'center' }}
      >
        <Grid item md={12}>
          <Typography
          variant='h1'
            sx={{
              textAlign: 'center',
              color: '#00328A',
              mb: '28px',
              px: {xs: '10px', md: 0},
            }}
          >
            Have Questions?
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography
            sx={{
              fontFamily: 'Public Sans',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: {md: '140%',  xs: '120%'},
              letterSpacing: 0,
              textAlign: 'center',
              maxWidth: '888px',
              mb: '75px',
              px: {xs: '10px', md: 0},
            }}
          >
            Explore our comprehensive FAQ section to learn more about corporate bond investments,
            processes, and requirements.
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Button
            variant="outlined"
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              px: 3,
              py: 1,
              mb: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            View FAQ
            <Box
              component="img"
              src="/assets/icons/faqs/view_faq.png"
              alt="View FAQ"
              sx={{ width: 20, height: 20 }}
            />
          </Button>
        </Grid>
      </Stack>
    </Grid>
  );
}
