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
    title: 'Identify Opportunities',
    description: 'Work with qualified brokers, aggregators, or investment advisors to identify suitable unlisted bond opportunities matching your risk profile.',
    icon: 'mdi:magnify',
  },
  {
    id: 2,
    title: 'Conduct Due Diligence',
    description: "Thoroughly analyze the issuer's financials, business model, management quality, and bond terms before making investment decisions.",
    icon: 'heroicons:document-check',
  },
  {
    id: 3,
    title: 'Private Placement Process',
    description: 'Complete the private placement documentation, negotiate terms if applicable, and execute the investment through proper legal channels.',
    icon: 'ph:hand-heart-light',
  },
  {
    id: 4,
    title: 'Hold & Monitor',
    description: 'Manage your investment by monitoring issuer performance and market conditions until maturity or potential resale opportunities.',
    icon: 'streamline-plump:piggy-bank',
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
        <m.div variants={varFade().inRight}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' ,mb: 3 }}>
            <Box component="span" sx={{ color: 'primary.main' }}>
              How to Invest in Unlisted Bonds
            </Box>
          </Typography>
        </m.div>
        
        <m.div variants={varFade().inUp}>
          <Typography
          variant="subtitle1"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            Navigate the private placement process with our step-by-step guide for unlisted bond investments.
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
                        variant="h5"
                        sx={{ 
                            fontWeight: 500,
                            color: 'primary.main',
                            mb: 1,
                            mt:2,
                            fontSize: '15px'
                        }}
                        >
                        {step.title}
                        </Typography>
                        <Typography 
                        variant="suntitle2" 
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