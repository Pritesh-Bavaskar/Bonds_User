import { m } from 'framer-motion';
// @mui
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { bgcolor } from '@mui/system';

// ----------------------------------------------------------------------

const LISTED_FEATURES = [
  {
    title: 'Exchange Trading',
    description: 'Traded on NSE/BSE with transparent pricing.',
    icon: 'tabler:world',
  },
  {
    title: 'High Transparency',
    description: 'Regular disclosures and regulatory oversight.',
    icon: 'famicons:eye-outline',
  },
  {
    title: 'High Liquidity',
    description: 'Easy entry and exit through secondary market.',
    icon: 'ph:pulse-light',
  },
  {
    title: 'Regulatory Protection',
    description: 'SEBI oversight and investor protection measures etc.',
    icon: 'line-md:security',
  },
];

const UNLISTED_FEATURES = [
  {
    title: 'Private Placement',
    description: 'OTC transactions with negotiated terms.',
    icon: 'mdi:account-group-outline',
  },
  {
    title: 'Limited Transparency',
    description: 'Less stringent disclosure requirements.',
    icon: 'mdi:eye-off-outline',
  },
  {
    title: 'Lower Liquidity',
    description: 'Higher chances for locked, limited market.',
    icon: 'mdi:lock-outline',
  },
  {
    title: 'Higher Yields',
    description: 'Regulatory premiums and credit risk compensation.',
    icon: 'mdi:trending-up',
  },
];

// ----------------------------------------------------------------------

export default function ListUnlistBond() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 3, md: 3 },
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <m.div variants={varFade().inRight}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' , mb: 3 }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
            Listed vs Unlisted Bonds
          </Box>
        </Typography>
      </m.div>

      {/* Subtitle */}
      <m.div variants={varFade().inUp} >
        <Typography
        variant="subtitle1"
          sx={{
            maxWidth: 700,
            mx: 'auto',
            mb: 6,
            mt: 2,
            fontWeight:500,       
          }}
        >
          Understanding the fundamental differences helps you make informed investment decisions.
        </Typography>
      </m.div>

      {/* Cards */}
      <Grid container spacing={4} justifyContent="center">
        {/* Listed Bonds */}
        <Grid xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              border: `1.5px solid ${"#99B3FF"}`,
              bgcolor: "#EFF6FF",
              textAlign: 'left',
              position: 'relative',
              maxHeight: 360 ,
            }}
          >
            <Chip
              label="Exchange Traded"
              size="small"
              variant="outlined"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontSize: 12,
                fontWeight: 500,
                bgcolor: '#DBEAFE',
                color: "#144AE8",
                borderColor: theme.palette.primary.light,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Listed Bonds
            </Typography>
            {LISTED_FEATURES.map((item) => (
              <Box key={item.title} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2,borderRadius: '50%'}}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1,
                    mt: '2px',
                  }}
                >
                  <Iconify icon={item.icon} width={16} sx={{ color: theme.palette.primary.main }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 15 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              border: `1.5px solid ${"#00A76F"}`,
              bgcolor: "#ECFDF5",
              textAlign: 'left',
              position: 'relative',
              maxHeight: 360 ,
            }}
          >
            <Chip
              label="Private Placement"
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontSize: 12,
                fontWeight: 500,
                bgcolor: "#D0FAE5",
                color: "#007A55",
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Unlisted Bonds
            </Typography>
            {UNLISTED_FEATURES.map((item) => (
              <Box key={item.title} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1,
                    mt: '2px',
                  }}
                >
                  <Iconify icon={item.icon} width={16} sx={{ color: theme.palette.success.dark }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1"  >{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}