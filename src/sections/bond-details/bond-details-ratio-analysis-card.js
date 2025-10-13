import { Box, Typography, useTheme, Chip, Stack, Paper } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

export default function BondDetailsRatioAnalysisCard({
  gain = 0.5,
  companyName = 'HDFC Bank Limited',
  benchmark = 'NIFTY BOND INDEX',
  status = 'Good',
}) {
  const settings = useSettingsContext();
  const theme = useTheme();

  const isGain = gain >= 0;
  const isGood = status.toLowerCase() === 'good';
  const gainColor = isGain ? 'success.main' : 'error.main';
  const gainText = `${isGain ? '+' : ''}${gain}%`;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            // bgcolor: isGood ? 'success.lighter' : 'error.lighter',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            color: isGood ? 'success.dark' : 'error.dark',
            fontWeight: 'bold',
            flexShrink: 0,
          }}
        >
          <Typography variant="h5" sx={{ lineHeight: 1, pt: { xs: 1, md: 0 } }}>
            {gainText}
          </Typography>
          {/* <Typography variant="caption" sx={{ lineHeight: 1, opacity: 0.8, fontSize: '0.6rem' }}>
            {isGain ? 'GAIN' : 'LOSS'}
          </Typography> */}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {companyName}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontStyle: 'bold', color: '#306CD3', mt: 0.5 }}
          >
            Benchmark: {benchmark}
          </Typography>
        </Box>

        <Chip
          label={status}
          size="large"
          sx={{
            bgcolor: isGood ? 'success.lighter' : 'error.lighter',
            color: isGood ? 'success.dark' : 'error.dark',
            height: 'auto',
            '& .MuiChip-label': {
              px: 1.5,
              py: 0.5,
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: 0,
            },
          }}
        />
      </Stack>
    </Paper>
  );
}
