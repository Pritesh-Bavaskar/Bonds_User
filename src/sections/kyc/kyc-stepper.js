// @mui
// components

// ----------------------------------------------------------------------

import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { RouterLink } from 'src/routes/components';

export default function KYCStepper({ statuses = [] }) {
  const steps = [
    { number: 1, lines: ['KYC', 'Verification'] },
    { number: 2, lines: ['Address', 'Information'] },
    { number: 3, lines: ['Company', 'Details'] },
    { number: 4, lines: ['Bank & Demat', 'Details'] },
    { number: 5, lines: ['Audit', 'Financial'] },
    { number: 6, lines: ['Signatory'] },
    { number: 7, lines: ['Review'] },
  ];

  const getColors = (status) => {
    switch (status) {
      case 'completed':
        return { border: '#17a34a', text: '#111827' }; // green
      case 'pending':
        return { border: '#f59e0b', text: '#111827' }; // yellow
      default:
        return { border: '#d1d5db', text: '#6b7280' }; // grey for not-started/undefined
    }
  };

  const getPath = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return '/kyc/basic-info';
      case 2:
        return '/kyc/address-info';
      case 3:
        return '/kyc/company-details';
      case 4:
        return '/kyc/bank-details';
      case 5:
        return '/kyc/audited-financial'; // Audit: to be added later
      case 6:
        return '/kyc/signatories';
      case 7:
        return '/kyc/review-and-submit';
      default:
        return null;
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent={{ xs: 'flex-start', md: 'space-between' }}
      spacing={{ xs: 2, sm: 3, md: 4 }}
      sx={{
        width: '100%',
        pt: 6,
        overflowX: { xs: 'auto', md: 'visible' },
        pb: { xs: 1, md: 0 },
        // smooth scroll for mobile usability
        scrollBehavior: 'smooth',
      }}
    >
      {steps.map((step, idx) => {
        const status = statuses[idx] || 'not-started';
        const colors = getColors(status);
        const to = getPath(step.number);
        return (
          <Stack
            key={step.number}
            alignItems="center"
            spacing={{ xs: 1, sm: 1.25 }}
            sx={{
              minWidth: { xs: 80, sm: 96 },
              textDecoration: 'none',
              color: 'inherit',
              cursor: to ? 'pointer' : 'default',
              flexShrink: 0,
            }}
            {...(to ? { component: RouterLink, to } : {})}
          >
            <Box
              sx={{
                width: { xs: 32, sm: 36, md: 40 },
                height: { xs: 32, sm: 36, md: 40 },
                borderRadius: '50%',
                border: `2px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                backgroundColor: '#fff',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: '#111827', fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' } }}
              >
                {step.number}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              {step.lines.map((line, i) => (
                <Typography
                  key={i}
                  variant="caption"
                  component="div"
                  sx={{ lineHeight: 1.2, color: colors.text, display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                >
                  {line}
                </Typography>
              ))}
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
}
