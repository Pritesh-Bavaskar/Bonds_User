import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------
const FEATURES = [
  {
    title: 'Higher Returns',
    description: 'Access yields typically higher than listed bonds due to illiquidity premium and private placement nature.',
    icon: 'carbon:growth',
  },
  {
    title: 'Flexible Structuring',
    description: 'Customized terms, tenures, and payment structures tailored to meet specific investor requirements.  ',
    icon: 'weui:setting-outlined',
  },
  {
    title: 'Secured / Collateral-Backed',
    description: 'Many unlisted bonds offer asset backing or collateral security, reducing default risk.',
    icon: 'line-md:security',
  },
  {
    title: 'Portfolio Diversification',
    description: 'Access to unique investment opportunities not available in public markets for better portfolio balance.',
    icon: 'bytesize:portfolio',
  },
  {
    title: 'Private Placement Access',
    description: 'Exclusive access to institutional-grade investments typically reserved for qualified investors.',
    icon: 'ph:hand-heart-light', 
  },
  {
    title: 'Negotiated Terms',
    description: 'Ability to negotiate specific terms, covenants, and conditions directly with the issuer.',
    icon: 'heroicons:document-check',
  },
];
// ----------------------------------------------------------------------

export default function Benefit() {
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
      <m.div variants={varFade().inRight}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
            Benefits of Investing in Unlisted Bonds
          </Box>
        </Typography>
      </m.div>

      {/* Subtitle */}
      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            maxWidth: 730,
            mx: 'auto',
            mb: 8,
            mt: 2,
            fontWeight:500,        
          }}
        >
          Discover the unique advantages of private placement bonds for sophisticated investors seeking enhanced returns.
        </Typography>
      </m.div>

      {/* Features */}
      <Grid container spacing={4} justifyContent="center">
        {FEATURES.map((item, index) => (
          <Grid xs={12} sm={6} md={4} key={item.title}>
            <m.div variants={varFade().inUp}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  maxHeight: 450,
                }}
              >
                {/* Icon with circle */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: "#E9F4FF",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                  }}
                >
                  <Iconify
                    icon={item.icon}
                    width={25}
                    height={25}
                    color={"#000000"}
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography variant="subtitle2" color="text.secondary" sx={{ height: 50 }}>
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
