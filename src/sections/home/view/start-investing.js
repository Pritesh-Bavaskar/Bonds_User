import { Box, Typography, Button, Stack } from '@mui/material';

export default function StartInvesting() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >

      <Box
        component="img"
        src="/assets/images/start-investing/investing.png" 
        alt="Invest Illustration"
        sx={{
          width: { xs: '80%', sm: 400 },
          maxWidth: 450,
          mb: 3,
        }}
      />

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: 800,
          color: '#18191B',
          mb: 3,
        }}
      >
        Begin your investment journey with complete peace of mind our verified and transparent
        bond options make it easy to invest safely and confidently
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: '#002A5C',
          px: 4,
          py: 1.5,
          borderRadius: '8px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: '#003B7A',
          },
        }}
      >
        Start Investing
      </Button>
    </Box>
  );
}
