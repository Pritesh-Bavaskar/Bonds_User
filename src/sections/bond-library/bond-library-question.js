import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function BondLibraryQuestion() {
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
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              mb: 2
            }}
          >
            Bond Library
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 900,
              color: 'text.secondary',
              fontWeight: 'normal'
            }}
          >
            Explore our comprehensive collection of bond-related resources, guides, and educational materials to enhance your understanding of bond investments and market trends.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              mt: 0,
              px: 2,
              py: 1,
              borderWidth: '1px',
              '&:hover': {
                borderWidth: '1px',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '140%',
                textTransform: 'none',
              }}
            >
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                View FAQ
                <Box component="img" src="/assets/icons/bond-library/faq-icon.svg" alt="" sx={{ width: 16, height: 16, ml: 0.5 }} />
              </Box>
            </Typography>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
