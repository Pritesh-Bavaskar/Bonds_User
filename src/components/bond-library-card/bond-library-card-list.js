import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'src/routes/hook/use-router';

// ----------------------------------------------------------------------

export default function BondLibraryCardList({ item }) {
  const theme = useTheme();
  const router = useRouter();

  const handleKnowMore = () => {
    router.push(`/bond-details/${item.isin_code}`);
  };

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
          sx={{
            position: 'relative',
            width: 90,
            height: 30,
            top: -31,
            right: 30                 // keep EXACTLY as you had it
          }}
        >
          <Box
            component="img"
            src="/assets/icons/bond-library/trending-list.svg"
            alt="Trending"
            sx={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />

          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: '48%',
              left: '45%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '11px',
              whiteSpace: 'nowrap',
            }}
          >
            {item?.status || 'Trending'}
          </Typography>
        </Box>


        {/* ASAPL */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" sx={{ mt: 0, fontWeight: 700 }}>
            {item?.issuer_name || 'N.A.'}
          </Typography>

          {/* ISN */}
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            <span sx={{ fontWeight: 700, color: 'text.secondary' }}>ISN</span>{' '}
            {item?.isin_code || 'N.A.'}
          </Typography>

          <Box
            component="img"
            src={item.brandLogo || '/assets/icons/bond-library/company.png'}
            alt="logo"
            sx={{ height: 22 }}
          />
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
            <Typography variant="caption">{item?.price || 'N.A.'}</Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Coupon
            </Typography>
            <Typography variant="caption">{item?.coupon_rate_percent || 'N.A.'}%</Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Yield
            </Typography>
            <Typography variant="caption">{item?.ytm_percent || 'N.A.'}%</Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              IP Frequency
            </Typography>
            <Typography variant="caption">{item?.interest_payment_frequency || 'N.A.'}</Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Maturity Date
            </Typography>
            <Typography variant="caption">{item?.maturity_date || 'N.A.'}</Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Type of Bond
            </Typography>
            <Typography variant="caption">{item?.issuer_type || 'N.A.'}</Typography>
          </Stack>
          {/* </Stack> */}

          {/* Second Column */}
          {/* <Stack spacing={2} sx={{ flex: 1 }}> */}
          <Box
            sx={{
              width: 45,
              height: 45,
              borderRadius: "50%",
              border: "2px solid #00A76F",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Typography 
              sx={{
                fontSize: "14px",
                color: "#00A76F",
                whiteSpace: "nowrap",
                overflow: "hidden",
                padding: "4px",
              }} >
              {item?.ratings[0]?.rating || 'N.A.'}
            </Typography>
          </Box>
          {/* </Stack> */}
          <Button
            size="small"
            variant="contained"
            onClick={handleKnowMore}
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
