import { m } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const risks = [
  'Interest rate risk - Bond prices fluctuate inversely with interest rate changes',
  'Credit/default risk - Possibility of issuer defaulting on interest or principal payments',
  'Market volatility - Bond prices can be affected by overall market sentiment and economic conditions',
  'Liquidity risk - Some listed bonds may have lower trading volumes affecting exit flexibility',
];

export default function RisksConsiderations() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 3, md: 10 },
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <m.div variants={varFade().inUp}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={4}>
          <WarningAmberRoundedIcon sx={{ fontSize: 48 }} color="error" />
          <Typography variant="h1" fontWeight="bold">
            Risks & Considerations
          </Typography>
        </Box>
      </m.div>

      {/* Risks List */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          textAlign: 'left',
          maxWidth: 800,
          mx: 'auto',
          borderLeft: '1mm solid #FF6600',
        }}
      >
        <List>
          {risks.map((risk, index) => (
            <ListItem key={index} sx={{ alignItems: 'flex-start', px: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CircleIcon fontSize="small" sx={{ color: 'error.main' }} />
              </ListItemIcon>
              <ListItemText
                primary={risk}
                primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
              />
            </ListItem>
          ))}
        </List>

        {/* Important Note */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: '#FFF5F0',
            borderRadius: 1,
            border: '1px solid #FFE0D6',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 'bold' }}>
            Important:
          </Typography>
          <Typography variant="body2" sx={{ mx: 0.5, color: 'hsla(17, 100%, 31%, 1)' }}>
            Please carefully consider these risks and consult with qualified financial advisors
            before making investment decisions. Past performance does not guarantee future results.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
