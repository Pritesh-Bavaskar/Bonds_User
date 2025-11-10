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
        return null; // Audit: to be added later
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
      justifyContent="space-between"
      spacing={4}
      sx={{ width: '100%', pt: 6 }}
    >
      {steps.map((step, idx) => {
        const status = statuses[idx] || 'not-started';
        const colors = getColors(status);
        const to = getPath(step.number);
        return (
          <Stack
            key={step.number}
            alignItems="center"
            spacing={1.25}
            sx={{
              minWidth: 96,
              textDecoration: 'none',
              color: 'inherit',
              cursor: to ? 'pointer' : 'default',
            }}
            {...(to ? { component: RouterLink, to } : {})}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: `2px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                backgroundColor: '#fff',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827' }}>
                {step.number}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              {step.lines.map((line, i) => (
                <Typography
                  key={i}
                  variant="caption"
                  component="div"
                  sx={{ lineHeight: 1.2, color: colors.text, display: 'block' }}
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
