import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function BondLibraryHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: {xs: 4, md:10},
        pb: {xs: 0, md:10},
        overflow: 'hidden',
      }}
    >
      <Container>
        <Box
          component="img"
          src="/assets/images/bond-library/hero-img.svg"
          alt="Bond Library Illustration"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Container>
    </Box>
  );
}
