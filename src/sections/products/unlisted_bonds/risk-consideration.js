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
    title: 'Liquidity Risk',
    description: 'Limited or no secondary market availability makes it difficult to sell before maturity, potentially locking in your investment.',
    icon: 'streamline:money-graph-arrow-decrease-down-stats-graph-descend-right-arrow',
    backgroundColor: '#EFF6FF',
    color: '#155DFC',
  },
  {
    title: 'Credit Risk & Limited Transparency',
    description: 'Higher default risk due to less stringent disclosure requirements and limited public information about issuers.',
    icon: 'solar:danger-triangle-outline',
    backgroundColor: '#FEF2F2',
    color: '#E7000B',

  },
  {
    title: 'Complexity in Pricing',
    description: 'OTC pricing without public quotes makes valuation challenging and may result in unfavorable pricing.',
    icon: 'mdi:calculator',
    backgroundColor: '#FEF2F2',
    color: '#E7000B',

  },
  {
    title: 'Regulatory Constraints',
    description: 'SEBI allows only listed bonds on public platforms, limiting distribution channels and investor protection mechanisms.',
    icon: 'mynaui:danger-circle',
    backgroundColor: '#EFF6FF',
    color: '#155DFC',
  }
];

// ----------------------------------------------------------------------

export default function RiskConsideration() {
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
            Risks & Considerations
          </Box>
      </Typography>


      {/* Description */}
      <m.div>
        <Typography
          sx={{
            maxWidth: 700,
            mx: 'auto',
            mb: 8,
            mt: 2,
            fontWeight:500,       
          }}
        >
          Important factors to consider before investing in unlisted bonds to make informed decisions.
        </Typography>
      </m.div>


      {/* Features */}

<Grid container spacing={4} justifyContent="center">
  {FEATURES.map((item, index) => (
    <Grid xs={12} sm={6} md={6} key={item.title}>
      <m.div variants={varFade().inUp}>
        
        <Box
          sx={{
            p: 2,
            height: '100%',
            textAlign: 'left',
            borderRadius: 2,
            boxShadow: 3,
            position: 'relative',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },  
            backgroundColor: item.backgroundColor,
            maxHeight: 120,
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
                        width={25}                  // icon size
                        height={25}
                        margin='5px'
                        color={item.color} // icon color
                    />
            </Box>

            <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, mb: 1, fontSize: 15, ml:8 ,mt:-3.5 ,mb:2}}
            >
                {item.title}
            </Typography>

          <Typography variant="subtitle2" color="text.secondary" sx={{ height: 50,ml:8 }}>
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
