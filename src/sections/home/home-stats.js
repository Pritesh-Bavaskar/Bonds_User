// CountUp.tsx
import { Box, Typography, Grid, Container } from '@mui/material';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useGetStats } from 'src/api/stats';

export default function HomeStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { stats } = useGetStats();

  const defaultStats = [
    { value: stats?.totalCustomers, label: 'Customers' },
    { value: stats?.totalBonds, label: 'Bonds' },
    { value: stats?.totalIssuers, label: 'Issuers' },
    { value: stats?.stableReturnPercent , label: 'Stable Returns %' },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 1, md: 0 },
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 4 }}>
          <Typography variant="h3" align="center" color="#003289" gutterBottom sx={{ fontWeight: 700, }}>
            Our Growing Investment Community
          </Typography>
          <Typography variant="h5" align="center" color="#637381" gutterBottom>
            Find government and corporate bonds with detailed coupon rates, yields, and maturity
            schedules. Our interactive bond timeline helps you identify opportunities at the right
            time.
          </Typography>
        </Container>
        <Container maxWidth='lg'>
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{
            border: '1px solid #FFAB00',
            borderRadius: 0,
            overflow: 'hidden',
            aspectRatio: { xs: '1', md: 'auto' },
            bgcolor: '#003289',
          }}
        >
          {defaultStats.map((stat, idx) => (
            <Grid
              item
              xs={6}
              md={3}
              className={`counter-item ${idx === 0 ? 'first-item' : ''} ${
                idx === defaultStats.length - 1 ? 'last-item' : ''
              }`}
              key={stat.label}
              sx={{
                borderRight: {
                  xs: idx % 2 === 0 ? '1px solid #FFAB00' : 'none',
                  md: idx !== defaultStats.length - 1 ? '1px solid #FFAB00' : 'none',
                },
                borderBottom: {
                  xs: idx < 2 ? '1px solid #FFAB00' : 'none',
                  md: 'none',
                },
                borderLeft: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 1, md: 2 },
                px: { xs: 1, md: 0 },
                bgcolor: 'inherit',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', mb: 1 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 500,
                  }}
                >
                  {inView && <CountUp end={stat.value} duration={2} separator="," />}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 200,
                    lineHeight: 1,
                    ml: 0,
                    position: 'relative',
                  }}
                >
                  +
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#ffffff',
                  fontWeight: 500,
                  pt: 1,
                }}
              >
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
        </Container>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4 }}>
          <Typography variant="h5" align="center" color="#637381" gutterBottom>
            We are committed to breaking down the barriers of traditional finance by offering clear
            information, real-time updates, and user-friendly tools that help investors stay
            informed and ahead of the market.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
