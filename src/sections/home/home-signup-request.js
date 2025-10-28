import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function HomeSignupRequest() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        mt: { xs: 6, md: 15 },
        background: 'linear-gradient(90deg, #003EAA 0%, #020D1E 100%)',
        minHeight: { xs: 200, sm: 220, md: 250 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant="h4"
          sx={{
            lineHeight: 1.2,
            color: '#FFFFFF',
          }}
        >
          Sign up for free and get instant access to our stock and bond listings, along with tools
          designed to make investing easier and smarter
        </Typography>
      </Container>
    </Box>
  );
}
