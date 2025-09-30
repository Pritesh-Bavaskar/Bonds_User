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
import { color } from 'highcharts';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    title: 'Treasury Bills',
    description: 'Backed by the full faith and credit of the Government of India, offering the highest level of security.',
    icon: 'mdi:shield-check-outline',
    backgroundColor: '#EFF6FF',
    color: '#155DFC',
  },
  {
    title: 'Regular Coupon Income',
    description: 'Receive fixed interest payments at regular intervals throughout the bond.',
    icon: 'solar:danger-triangle-outline',
    backgroundColor: '#FEF2F2',
    color: '#E7000B',

  },
  {
    title: 'High Liquidity',
    description: 'Trade easily in the secondary market through NSE and BSE with transparent pricing.',
    icon: 'mynaui:danger-circle',
    backgroundColor: '#FEF2F2',
    color: '#E7000B',

  },
  {
    title: 'Tax-efficient',
    description: 'No TDS deduction on interest payments, making them more tax-efficient than corporate bonds.',
    icon: 'hugeicons:money-security',
    backgroundColor: '#EFF6FF',
    color: '#155DFC',
  }
];

// ----------------------------------------------------------------------

export default function GovSecurities() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: 'center',
      }}
    >
      {/* Title */}
     <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
            Important Investor Notes
          </Box>
      </Typography>


      {/* Description */}
      <m.div>
        <Typography
          sx={{
            maxWidth: 1016,      // match the div width
            mx: 'auto',
            mt: 3,
            fontFamily: "Public Sans",
            color: theme.palette.text.secondary,
            height: 120,          // optional, match div height
          }}
        >
          Understanding the risk-return profile helps you make informed investment decisions.
        </Typography>
      </m.div>


      {/* Features */}

<Grid container spacing={4} justifyContent="center">
  {FEATURES.map((item, index) => (
    <Grid xs={12} sm={6} md={6} key={item.title}>
      <m.div variants={varFade().inUp}>
        
        <Box
          sx={{
            p: 3,
            height: '100%',
            textAlign: 'left',
            borderRadius: 2,
            boxShadow: 3,
            position: 'relative',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },  
            backgroundColor: item.backgroundColor,
            height: 150,
          }}
        >
            <Box
                sx={{
                    width: 36,                 // size of circle
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',  // circle color
                    display: 'flex',
                    }}
                >
                    <Iconify
                        icon={item.icon}
                        width={30}                  // icon size
                        height={30}
                        margin='2px'
                        color={item.color} // icon color
                    />
            </Box>

            <Typography
                gutterBottom
                sx={{ fontWeight: 600, mb: 1, fontSize: 15, ml:8 ,mt:-3.5 }}
            >
                {item.title}
            </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ height: 50,ml:8 }}>
            {item.description}
          </Typography>
        </Box>
      </m.div>
    </Grid>
  ))}
</Grid>
    </Container>
  );
}
