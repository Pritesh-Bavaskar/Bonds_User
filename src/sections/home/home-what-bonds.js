import { Box, Typography, Grid, Container } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const BOND_TYPES = [
  {
    key: 'govt',
    icon: 'mdi:bank-outline',
    title: 'Government Bonds',
    description: "Safe and stable investments backed by the government's credit.",
  },
  {
    key: 'corporate',
    icon: 'mdi:domain',
    title: 'Corporate Bonds',
    description: 'Earn higher returns by investing in bonds issued by trusted companies.',
  },
  {
    key: 'listed',
    icon: 'mdi:magnify-scan',
    title: 'Listed Bonds',
    description: 'Transparent, liquid, and exchange-traded for easy access and tracking.',
  },
  {
    key: 'unlisted',
    icon: 'mdi:pencil-outline',
    title: 'Unlisted Bonds',
    description: 'Private-market bonds with unique opportunities and higher risk-reward potential',
  },
];

export default function HomeWhatBonds() {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ pt: { xs: 6, md: 15 } }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="h1"
          align="center"
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          What are{' '}
          <Box component="span" sx={{ color: theme.palette.warning.main }}>
            Bonds?
          </Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          align="center"
          variant="h5"
          color="#18191B"
          sx={{ mt: 4, mx: 'auto', fontWeight: 300 }}
        >
          Find government and corporate bonds with detailed coupon rates, yields, and maturity
          schedules. Our interactive bond timeline helps you identify opportunities at the right
          time.
        </Typography>

        {/* Grid */}
        <Grid container spacing={{ xs: 2.5, sm: 3.5, md: 4.5 }} sx={{ mt: { xs: 4, md: 7 } }}>
          {BOND_TYPES.map((item) => {
            const isHighlighted = Boolean(item.highlighted);
            return (
              <Grid key={item.key} item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    px: { xs: 3, md: 3 },
                    py: { xs: 5, md: 8 },
                    borderRadius: 2,
                    // Use transparent border so layout doesn't shift; appears on hover
                    border: '1px solid',
                    borderColor: isHighlighted ? theme.palette.warning.main : 'transparent',
                    bgcolor: isHighlighted
                      ? alpha(theme.palette.grey[500], 0.06)
                      : 'background.paper',
                    boxShadow: isHighlighted
                      ? `0 8px 22px ${alpha(theme.palette.primary.main, 0.18)}`
                      : 'none',
                    transition: 'all 200ms ease',
                    '&:hover': {
                      borderColor: theme.palette.warning.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.06),
                      boxShadow: `0 8px 22px ${alpha(theme.palette.primary.main, 0.18)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 1.5,
                      display: 'grid',
                      placeItems: 'center',
                      color: theme.palette.primary.main,
                      mb: 2.5,
                    }}
                  >
                    <Icon icon={item.icon} width={36} height={36} />
                  </Box>

                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1.2 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
