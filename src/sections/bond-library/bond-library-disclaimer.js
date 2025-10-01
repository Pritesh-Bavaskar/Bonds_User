import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function BondLibraryDisclaimer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 10,
        pb: 10,
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Typography 
          sx={{ 
            fontWeight: 600,
            fontSize: '16px',
            letterSpacing: '0px',
            mb: 2,
            color: 'text.primary'
          }}
        >
          Disclaimers
        </Typography>
        
        <Stack spacing={1}>
          <Typography 
            sx={{
              fontWeight: 400,
              fontSize: '12px',
              letterSpacing: '0px',
              color: 'text.secondary',
              lineHeight: 1.5
            }}
          >
            • The information provided in this bond library is for informational purposes only and should not be considered as financial advice.
          </Typography>
          <Typography 
            sx={{
              fontWeight: 400,
              fontSize: '12px',
              letterSpacing: '0px',
              color: 'text.secondary',
              lineHeight: 1.5
            }}
          >
            • Past performance is not indicative of future results. Bond values and yields are subject to market risks.
          </Typography>
          <Typography 
            sx={{
              fontWeight: 400,
              fontSize: '12px',
              letterSpacing: '0px',
              color: 'text.secondary',
              lineHeight: 1.5
            }}
          >
            • Please consult with a qualified financial advisor before making any investment decisions.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
