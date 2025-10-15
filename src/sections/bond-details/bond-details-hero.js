import { Container, Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSettingsContext } from 'src/components/settings';

const companyLogo = '/assets/icons/bond-library/company-img.svg';

export default function BondDetailsHero({bond}) {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: '#E8F3FF',
        py: 4,
        mb: 4,
        borderRadius: 1,
      }}
    >
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
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
            src={bond?.brandLogo || companyLogo}
            alt="Company Logo"
            sx={{
              width: 280,
              height: 'auto',
              mb: 3,
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
            }}
          >
            {bond?.rta?.rta?.rta_name || 'Company Name'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

BondDetailsHero.propTypes = {
  bond: PropTypes.object,
};