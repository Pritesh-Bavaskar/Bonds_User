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
            lineHeight: 1.3,
            color: '#FFFFFF',
          }}
        >
         Explore high-quality bond opportunities across corporate, government, and unlisted markets, with intuitive tools designed to simplify comparison, analysis, and decision-making.
        </Typography>
      </Container>
    </Box>
  );
}
