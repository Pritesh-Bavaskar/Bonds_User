import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const INVESTMENT_STEPS = [
  {
    id: 1,
    title: 'KYC & Account Setup',
    description: 'Complete your KYC process and open a demat account with a registered broker or bank to start investing in government securities.',
    icon: 'mdi:account-outline',
  },
  {
    id: 2,
    title: 'Browse Government Bonds',
    description: 'Explore available government securities, compare yields, tenures, and choose bonds that match your investment objectives and risk profile.',
    icon: 'mdi:magnify',
  },
  {
    id: 3,
    title: 'Participate in Auctions',
    description: 'Bid in primary auctions through competitive or non-competitive routes, or purchase from the secondary market at prevailing prices.',
    icon: 'mdi:gavel',
  },
  {
    id: 4,
    title: 'Hold & Receive Interest',
    description: 'Hold your bonds in demat form and receive periodic coupon payments until maturity when you get back the principal amount.',
    icon: 'mdi:cash-multiple',
  },
];

// ----------------------------------------------------------------------

export default function BondInvestment() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 8, md: 12 },
        maxWidth: '800px !important',
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <m.div variants={varFade().inUp}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 3,
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}
          >
            How to Invest in Government Bonds
          </Typography>
        </m.div>
        
        <m.div variants={varFade().inUp}>
          <Typography
            sx={{
              maxWidth: 600,
              mx: 'auto',
              color: theme.palette.text.secondary,
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            Follow these simple steps to start investing in government securities and build a secure investment portfolio.
          </Typography>
        </m.div>
      </Box>

      {/* Steps */}
      
      <Box sx={{ position: 'relative' }}>
        {INVESTMENT_STEPS.map((step, index) => (
        <Box>
            <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: "#ddd", // line color
                    position: "absolute",
                    top: "50%",
                    left: 45,
                    right: 0,
                    zIndex: 1,
                    }}
                />
                {/* Circle */}
                <Box
                    sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: "#00A76F",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    zIndex: 2, // make sure it sits above the line
                    }}
                >
                    {step.id}
                </Box>
            </Box>

            <Box key={step.id} sx={{ position: 'relative' }}>
            <m.div 
                variants={varFade().inUp}
                transition={{ delay: index * 0.1 }}
            >
                <Stack 
                direction="row" 
                spacing={2} 
                alignItems="flex-start"
                sx={{ 
                    mb: index < INVESTMENT_STEPS.length - 1 ? 4 : 0,
                    position: 'relative'
                }}
                >
                {/* Step Number Circle */}


                {/* Content */}
                <Box sx={{ flex: 1, pt: 0.5 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                {/* Icon */}

                    
                    <Box sx={{ mt: 2, flexShrink: 0}}>
                        <Iconify  
                            icon={step.icon}
                            width={20}
                            height={20}
                            color={theme.palette.primary.main}
                        />
                    </Box>

                    <Box>
                        <Typography 
                        sx={{ 
                            fontWeight: 600,
                            color: 'primary.main',
                            mb: 1,
                            mt:2,
                            fontSize: '15px'
                        }}
                        >
                        {step.title}
                        </Typography>
                        <Typography 
                        variant="body2" 
                        sx={{ 
                            color: theme.palette.text.secondary,
                            lineHeight: 1.6,
                            fontSize: '0.95rem'
                        }}
                        >
                        {step.description}
                        </Typography>
                    </Box>
                    </Stack>
                </Box>
                </Stack>
            </m.div>

            {index < INVESTMENT_STEPS.length - 1 && (
                <Box
                sx={{
                    position: 'absolute',
                    left: '10px',
                    top: '45px',
                    width: '0px',
                    height: '80px',
                    borderLeft: '2px dotted #00A767',
                    zIndex: 1,
                }}
                />
            )}
            </Box>
        </Box>
        ))}
      </Box>
    </Container>
  );
}