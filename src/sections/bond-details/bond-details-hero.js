import { Container, Box, Typography, useTheme, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useSettingsContext } from 'src/components/settings';

const companyLogo = '/assets/icons/bond-library/company-img.svg';

export default function BondDetailsHero({ bondHero }) {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 4,
        background: 'linear-gradient(90deg, #001021 0%, #0169D7 100%)',
        py: 4,
        mb: 4,
        borderRadius: 0,
        maxWidth: '100%',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
            textAlign: 'center',
            // minHeight: 200,
          }}
        >
          {/* Company Logo */}
          <Box
            component="img"
            src={bondHero?.company?.company?.issuer_logo || companyLogo}
            alt="Company Logo"
            sx={{
              mb: 2,
              objectFit: 'contain',
            }}
          />

          {/* Company Name */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontStyle: 'bold',
              lineHeight: '24px',
              mt: 2,
              color: theme.palette.common.white,
              textAlign: 'left',
            }}
          >
            {bondHero?.company?.company?.issuer_name || 'Navi Finserv Limited - INE3342T07494'}
          </Typography>
        </Box>
        <Grid container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ mt: 4 }} spacing={2}>
          <Grid item md={2}>
            <Typography sx={{ color: theme.palette.common.white }}>Yield to Maturity</Typography>
            <Typography sx={{ color: theme.palette.common.white }}>{bondHero?.bond?.ytm_percent || 'NA'}% </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography sx={{ color: theme.palette.common.white }}>Coupon Rate</Typography>
            <Typography sx={{ color: theme.palette.common.white }}>{bondHero?.bond?.coupon_rate_percent || 'NA'}%</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography sx={{ color: theme.palette.common.white }}>Maturity Date</Typography>
            <Typography sx={{ color: theme.palette.common.white }}>{bondHero?.bond?.maturity_date || 'NA'}</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography sx={{ color: theme.palette.common.white }}>Min Investment</Typography>
            <Typography sx={{ color: theme.palette.common.white }}>₹{bondHero?.bond?.minimum_investment_rs || 'NA'}</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography sx={{ color: theme.palette.common.white }}>ISIN</Typography>
            <Typography sx={{ color: theme.palette.common.white }}>{bondHero?.bond?.isin_code || 'NA'}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

BondDetailsHero.propTypes = {
  bond: PropTypes.object,
};
