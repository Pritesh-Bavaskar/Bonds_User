import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function ListedInfo() {
  const theme = useTheme();

  const features = [
    {
      title: "Openly Traded",
      subtitle: "High liquidity with easy buy/sell options",
    },
    {
      title: "Price Transparency",
      subtitle: "Public pricing with real-time discovery",
    },
    {
      title: "SEBI Regulated",
      subtitle: "Enhanced investor protection",
    },
  ];

  return (
    <Container
      component={MotionViewport}
      sx={{
        maxWidth: '1061px',
        py: { xs: 10, md: 10 },
        textAlign: 'center',
      }}
    >
      {/* Heading */}
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        <Box component="span" sx={{ color: 'primary.main' }}>
          What Are
        </Box>{' '}
        <Box component="span" sx={{ color: 'orange' }}>
          Listed Bonds?
        </Box>
      </Typography>

      {/* Description */}
      <m.div>
        <Typography
          variant="subtitle1"
          sx={{
            maxWidth: "1016px",
            fontWeight:500,
           px:9,
            mx: 'auto',
            mt: 6,
            fontFamily: 'Public Sans',
            color: theme.palette.text.primary,
          }}
        >
       Listed bonds are debt securities issued by governments or corporations and traded on stock exchanges such as NSE or BSE. These bonds offer investors a regulated, transparent way to invest in debt instruments with enhanced liquidity and market oversight
        </Typography>
      </m.div>

      {/* Features */}
      <Grid
        container
        spacing={4}
        sx={{
          mt: 6,
          justifyContent: 'center',
          textAlign: { xs: 'left', md: 'center' },
        }}
      >
        {features.map((feature) => (
          <Grid
            key={feature.title}
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            {/* Top row: tick + title */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                component="img"
                src="/assets/Svg/tick.svg"
                sx={{ width: 20, height: 20, mr: 1 }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: 15, md: 18 },
                  color: 'text.primary',
                }}
              >
                {feature.title}
              </Typography>
            </Box>

            {/* Subtitle */}
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 13, md: 14 },
              }}
            >
              {feature.subtitle}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
