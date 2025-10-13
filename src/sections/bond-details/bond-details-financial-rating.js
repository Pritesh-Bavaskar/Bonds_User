import { Box, Typography, useTheme } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

export default function BondDetailsAboutCompany() {
  const theme = useTheme();
  const settings = useSettingsContext();

  // Financial data with detailed information
  const financialData = [
    { 
      metric: 'Credit Rating / Outlook',
      value: (
        <>
          <Box sx={{ mb: 1 }}>[ICRA] <strong>BBB+</strong> / Stable; Crisil <strong>BBB+</strong> / Stable</Box>
          <Typography variant="caption" color="text.secondary">
            Meaning adequate ability to service debt, moderate risk.
          </Typography>
        </>
      )
    },
    { 
      metric: 'AUM (Assets Under Management)',
      value: (
        <>
          <Box sx={{ mb: 1 }}>~ ₹ 5,364 Crore <Box component="span" sx={{ color: 'error.main', fontSize: '0.875rem' }}>(as of September 30, 2024)</Box></Box>
          <Typography variant="caption" color="text.secondary">
            This is slightly down from ~ ₹ 6,010 Crore at end of March-2024.
          </Typography>
        </>
      )
    },
    { 
      metric: 'Portfolio Quality',
      value: (
        <>
          <Box>~ ₹ 4,988 Crore in FY2024</Box>
          <Box>compared to ~ ₹ 4,191 Crore in FY2023.</Box>
        </>
      )
    },
  ];

  return (
    <Box sx={{ pt: { xs: 6, md: 12 } }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, fontStyle: 'bold' }}>
        Key Financial & Rating Snapshot
      </Typography>
      
      <Box>
        {/* Header Row */}
        <Box 
          sx={{ 
            display: { xs: 'none', sm: 'flex' },
            p: 2,
            pb: 1,
          }}
        >
          <Box sx={{ width: '50%', pl: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, fontStyle: 'bold' }}>
              Metric
            </Typography>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, fontStyle: 'bold' }}>
              Value/Status
            </Typography>
          </Box>
        </Box>
        
        {/* Data Rows */}
        {financialData.map((row, index) => (
          <Box 
            key={index}
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              p: { xs: 2, sm: 3 },
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&:not(:last-child)': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              }
            }}
          >
            <Box sx={{ 
              width: { xs: '100%', sm: '50%' },
              mb: { xs: 1, sm: 0 },
              pr: { sm: 2 },
              '& > *': {
                fontWeight: 400,
                fontStyle: 'regular',
                variant: 'h5'
              }
            }}>
              {row.metric}
            </Box>
            <Box sx={{ 
              width: { xs: '100%', sm: '50%' },
              '& > * + *': {
                mt: 0.5
              },
              '& > *': {
                fontWeight: 400,
                fontStyle: 'regular',
                variant: 'h5'
              }
            }}>
              {row.value}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
