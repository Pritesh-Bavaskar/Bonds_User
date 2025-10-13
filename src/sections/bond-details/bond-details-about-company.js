import { Container, Box, Typography, useTheme } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

const companyLogo = '/assets/icons/bond-library/company-img.svg';

export default function BondDetailsAboutCompany() {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Box sx={{ pt: { xs: 6, md: 12 } }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          About Satya MicroCapital Ltd (Issuer Info)
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 300,
            mt: 2,
            color: 'text.secondary',
            lineHeight: 1.6,
          }}
        >
          Satya MicroCapital Limited is an NBFC-Microfinance (NBFC-MFI) company in India, focused on
          providing small loans (especially to women) using Joint Liability Group (JLG) models and
          affordable individual loans. They also have a subsidiary for housing finance.
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 , pt: 2}}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Issuer Name:
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#fea92b' }}>
              KEERTANA FINSERV PRIVATE LIMITED
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFAB00', pt: 2 }}>
            ISIN: INE0NES07261
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, bgcolor: 'background.neutral', p: 2, borderRadius: 1, my: 1 }}
          >
            11.1% KEERTANA FINSERV PRIVATE LIMITED Secured Rated Listed NCD Maturity 19-Aug-2027
          </Typography>

          <Box
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
              mt: 1,
            }}
          >
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Bond Details:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>
                <b>11.1%</b> = The coupon/interest rate paid per year.
              </li>
              <li>
                <b>KEERTANA FINSERV PRIVATE LIMITED</b> = Issuer.
              </li>
              <li>
                <b>Secured</b> = The bond is backed by some security/collateral (less risky than
                unsecured).
              </li>
              <li>
                <b>Rated</b> = It has a credit rating from an agency.
              </li>
              <li>
                <b>Listed</b> = It trades on an exchange (NSE/BSE), so you can buy/sell more easily.
              </li>
              <li>
                <b>NCD</b> = Non-Convertible Debenture (a type of bond which cannot convert into
                shares).
              </li>
              <li>
                <b>Maturity 19-Aug-2027</b> = The date when the issuer will repay the principal.
              </li>
            </ul>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, fontStyle: 'italic' }}>
              <b>Why shown:</b> This is basically the "full name" of the bond. It tells you the
              return (11.1%), risk (secured), tradability (listed), and repayment date all in one
              line.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
