import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function BondLibraryCardList({ item }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mx: 1.25,
        p: 1.5,
        borderRadius: 1,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        boxShadow: `0 4px 16px ${alpha(theme.palette.grey[500], 0.24)}`,
        border: `1px solid ${alpha(theme.palette.grey[500], 0.16)}`,
        minHeight: 80,
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
            width: 90,
            height: 30,
            top: -28,
            position: 'relative',
          }}
        />

        {/* ASAPL */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" sx={{ mt: 0, fontWeight: 700 }}>
            {item.asapl} ASAPL
          </Typography>

          {/* Company Logo (optional) */}
          {item.date && (
            <Typography variant="subtitle2" sx={{ mt: 0, fontWeight: 700 }}>
              {item.date}
            </Typography>
          )}
          {/* ISN */}
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            <span sx={{ fontWeight: 700, color: 'text.secondary' }}>ISN</span> {item.isin}
          </Typography>

          {item.brandLogo && (
            <Box component="img" src={item.brandLogo} alt="logo" sx={{ height: 22 }} />
          )}
        </Stack>
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
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          {/* First Column */}
          {/* <Stack spacing={2} sx={{ flex: 1 }}> */}
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
              Yield
            </Typography>
            <Typography variant="caption">{item.yield}%</Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              IP Frequency
            </Typography>
            <Typography variant="caption">{item.ipFrequency}</Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Maturity Date
            </Typography>
            <Typography variant="caption">{item.maturityDate}</Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Type of Bond
            </Typography>
            <Typography variant="caption">{item.type}</Typography>
          </Stack>
          {/* </Stack> */}

          {/* Second Column */}
          {/* <Stack spacing={2} sx={{ flex: 1 }}> */}
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
          {/* </Stack> */}
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
        </Stack>
      </Box>
    </Box>
  );
}

BondLibraryCardList.propTypes = {
  item: PropTypes.object.isRequired,
};
