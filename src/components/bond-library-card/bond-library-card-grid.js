import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function BondLibraryCardGrid({ item }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mx: 1.25,
        borderRadius: 1,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        boxShadow: `0 4px 16px ${alpha(theme.palette.grey[500], 0.24)}`,
        border: `1px solid ${alpha(theme.palette.grey[500], 0.16)}`,
        minHeight: 360,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Section */}
      <Box sx={{ p: 2 }}>
        {/* Trending Label */}
        <Box
          component="img"
          src="/assets/icons/bond-library/trending.svg"
          alt="Trending"
          sx={{
            width: 70,
            height: 20,
            top: -20,
            position: 'relative',
          }}
        />

        {/* ASAPL */}
        <Typography variant="subtitle2" sx={{ mt: 0, fontWeight: 700 }}>
          {item.asapl} ASAPL
        </Typography>

        {/* Company Logo (optional) */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {item.date && (
            <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 700 }}>
              {item.date}
            </Typography>
          )}
          {item.brandLogo && (
            <Box component="img" src={item.brandLogo} alt="logo" sx={{ height: 22, mt: 1 }} />
          )}
        </Stack>

        {/* ISN */}
        <Typography variant="body2" sx={{ fontWeight: 700, pt: 4 }}>
          <span sx={{ fontWeight: 700, color: 'text.secondary' }}>ISN</span> {item.isin}
        </Typography>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: '#fff',
          mt: 'auto',
          p: 2.5,
          borderRadius: 1,
        }}
      >
        <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
          {/* First Column */}
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Stack spacing={0.5}>
              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                Price
              </Typography>
              <Typography variant="caption">{item.price}</Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                Coupon
              </Typography>
              <Typography variant="caption">{item.coupon}%</Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                IP Frequency
              </Typography>
              <Typography variant="caption">{item.ipFrequency}</Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                Type of Bond
              </Typography>
              <Typography variant="caption">{item.type}</Typography>
            </Stack>
          </Stack>

          {/* Second Column */}
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: alpha('#fff', 0.6),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              {/* <Typography variant="h6" fontWeight={700}>
                {item.yield}%
              </Typography> */}
            </Box>
            <Stack spacing={0.5} sx={{ width: '100%' }}>
              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                Yield
              </Typography>
              <Typography variant="caption">{item.yield}%</Typography>
            </Stack>
            <Stack spacing={0.5} sx={{ width: '100%' }}>
              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                Maturity Date
              </Typography>
              <Typography variant="caption">{item.maturityDate}</Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Know More Button */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: theme.palette.primary.main,
              borderRadius: 20,
              py: 1,
              px: 3,
              fontWeight: 600,
              '&:hover': {
                bgcolor: alpha('#fff', 0.9),
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              },
            }}
          >
            Know More
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

BondLibraryCardGrid.propTypes = {
  item: PropTypes.object.isRequired,
};
