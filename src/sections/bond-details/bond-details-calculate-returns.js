import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSettingsContext } from 'src/components/settings';

export default function BondDetailsCalculateReturns() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Top 4 and Bottom 4 mock data
  const topCards = [
    { title: 'Returns (YTM)', value: '12.50%', icon: '/icons/return.svg' },
    { title: 'Payment Terms', value: 'Quarterly', icon: '/icons/payment.svg' },
    { title: 'Remaining Tenure', value: '2Y10M28Days', icon: '/icons/tenure.svg' },
    { title: 'Min. investment', value: '₹ 96,826.98', icon: '/icons/investment.svg' },
  ];

  const bottomCards = [
    { title: 'Credit Rating', value: 'ACUITE A/STABLE (Provisional)' },
    { title: 'Seniority', value: 'SENIOR' },
    { title: 'Security', value: 'Secured' },
    { title: 'Default History', value: 'Zero' },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {/* ===================== LEFT SECTION ===================== */}
        <Grid item xs={12} md={6} lg={7}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'column' },
              flexWrap: 'wrap',
              gap: { xs: 2, md: 3 },
              height: '100%',
            }}
          >
            {/* Top Cards Section */}
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                boxShadow: '0px 0px 2.93px 0px #00000040',
                borderRadius: 2,
                width: '100%',
                flex: { md: '1 1 48%' },
                minHeight: { xs: 'auto', md: '300px' },
              }}
            >
              <Grid container spacing={2} sx={{ height: '100%' }}>
                {topCards.map((card, index) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    key={index} 
                    sx={{ 
                      height: { xs: 'auto', sm: '50%' },
                      minHeight: { xs: '100px', sm: 'auto' },
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      sx={{
                        border: '0.73px solid #FFAB00',
                        borderRadius: 2,
                        p: { xs: 1.5, sm: 2 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        position: 'relative',
                        height: '100%',
                        minHeight: '100px',
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {card.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            mt: 0.5,
                            color: card.title === 'Returns (YTM)' ? 'green' : 'text.primary',
                            fontWeight: 600,
                          }}
                        >
                          {card.value}
                        </Typography>
                      </Box>
                      <InfoOutlinedIcon
                        sx={{
                          fontSize: 18,
                          color: '#7A7A7A',
                          position: 'absolute',
                          top: 8,
                          right: 8,
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Bottom Cards Section */}
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                width: '100%',
                flex: { md: '1 1 48%' },
                minHeight: { xs: 'auto', md: '300px' },
                mt: { xs: 2, md: 0 }
              }}
            >
              <Grid container spacing={2} sx={{ height: '100%' }}>
                {bottomCards.map((card, index) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    key={index} 
                    sx={{ 
                      height: { xs: 'auto', sm: '50%' },
                      minHeight: { xs: '100px', sm: 'auto' },
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      sx={{
                        border: '1.04px solid #FFE9CA',
                        borderRadius: 2,
                        background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #FFF7DA 99.99%)',
                        p: { xs: 1.5, sm: 2 },
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '100%',
                        minHeight: '100px',
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#565454',
                          fontSize: { xs: '0.875rem', sm: '0.9rem' }
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          color: '#EA9F00', 
                          fontWeight: 600,
                          fontSize: { xs: '0.95rem', sm: '1rem' }
                        }}
                      >
                        {card.value}
                      </Typography>
                      <InfoOutlinedIcon
                        sx={{
                          fontSize: 18,
                          color: '#7A7A7A',
                          position: 'absolute',
                          top: 8,
                          right: 8,
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* ===================== RIGHT SECTION ===================== */}
        <Grid item xs={12} md={6} lg={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              minHeight: isMobile ? '300px' : '500px',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #FFAB00',
              borderRadius: 0.5,
            }}
          >
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Calculate Your Returns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Calculate your potential returns from bond investments
                </Typography>
              </Box>
              <Box
                component="img"
                src="/assets/images/bond-details/coins.svg" // replace with your image path
                alt="coins"
              />
            </Box>

            {/* Cashflow button */}
            <Button
              variant="outlined"
              size="small"
              sx={{
                alignSelf: 'flex-end',
                mt: 2,
                textTransform: 'none',
                borderColor: '#FFAB00',
                color: '#FFAB00',
                '&:hover': { borderColor: '#FFAB00', backgroundColor: '#FFF7E0' },
              }}
            >
              Cashflow Timeline
            </Button>

            {/* Text Fields */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Total Receivable
              </Typography>
              <TextField
                fullWidth
                value="₹ 1,30,757.06"
                InputProps={{ readOnly: true }}
                sx={{ mt: 0.5, mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary">
                Total Returns
              </Typography>
              <TextField
                fullWidth
                value="₹ 33,930.08"
                InputProps={{ readOnly: true }}
                sx={{ mt: 0.5, mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary">
                Investment Amount
              </Typography>
              <TextField
                fullWidth
                value="₹ 96,826.98"
                InputProps={{ readOnly: true }}
                sx={{ mt: 0.5 }}
              />
            </Box>

            {/* Unit Selector */}
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
              <IconButton>
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body1"
                sx={{ mx: 2, fontWeight: 'bold', minWidth: 24, textAlign: 'center' }}
              >
                1 Unit
              </Typography>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Box>

            {/* Sign In Button */}
            <Button
              variant="contained"
              sx={{
                mt: 'auto',
                backgroundColor: 'primary.main',
                color: 'white',
                textTransform: 'none',
                py: 1.2,
                fontWeight: 'bold',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              Sign In To Continue
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
