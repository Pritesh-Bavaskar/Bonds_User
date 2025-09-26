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
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// ----------------------------------------------------------------------

const FEATURES = [
    {

        title: 'Open Brokerage Account',
        description: 'Register with a SEBI-registered broker or investment platform that offers bond trading.',
        key: 'KYC documents required',
        icon: 'material-symbols-light:person-outline-rounded',

    },
    {
        title: 'Browse & Filter Bonds',
        description: 'Explore listed bonds by issuer, credit rating, yield, and maturity period.',
        key: 'Compare options easily',
        icon: 'mingcute:search-line',
    },
    {
        title: 'Trade During Market Hours',
        description: 'Place buy/sell orders during stock exchange hours (9:15 AM - 3:30 PM).',
        key: 'Real-time execution',
        icon: 'icons8:shopping-cart',
    },
    {
        title: 'Monitor & Trade',
        description: 'Track performance, collect interest payments, and trade or hold to maturity.',
        key: 'Flexible exit options',
        icon: 'streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow',
    },

];

// ----------------------------------------------------------------------

export default function ListedJourney() {
    const theme = useTheme();

    return (
        <Container
            component={MotionViewport}
            sx={{


                py: { xs: 10, md: 15 },
                textAlign: 'center',
            }}
        >
            <Box
                sx={{

                    height: 434,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bgcolor: 'hsla(218, 100%, 22%, 1)',
                    color: '#fff',
                    p: 4,
                    my: 9


                }} >
                <Typography variant='h3'
                    sx={{ my: 2 }}>
                    Start Your Listed Bond Investment Journey
                </Typography>
                <Typography variant='subtitle1' sx={{ my: 2 }}>
                    Join thousands of investors who choose the transparency and liquidity of
                    exchange-traded bonds.</Typography>
                <Box sx={{ maxwidth: 300, display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                    <Button
                        variant="contained"
                        sx={{

                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'center',
                            bgcolor: '#fff',
                            color: '#00296B',
                            fontWeight: 600,
                            borderRadius: 1.5,
                            my: 2,
                            mx: 2,
                            gap: 2,
                            px: 2,

                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#f3f6f9' },
                        }}
                        endIcon={<OpenInNewIcon sx={{ fontSize: 18 }} />}
                        href="https://your-educational-resource-link.com"
                        target="_blank"
                    >
                        Start investing
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            bgcolor: '#fff',
                            color: '#00296B',
                            fontWeight: 600,
                            borderRadius: 1.5,
                            // width: '150px',
                            my: 2,
                            mx: 2,
                            gap: 2,
                            px: 2,

                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#f3f6f9' },
                        }}

                    >
                        View Bond Calculator
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row", // fixed typo
                        justifyContent: "center", // center horizontally
                        alignItems: "center", // center vertically
                        gap: 4,
                        m: 4,
                    }}
                >
                    {["SEBI Regulated", "Real-time Trading", "Transparent Pricing"].map(
                        (item) => (
                            <Typography
                                key={item}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontFamily: "Public Sans, sans-serif",
                                    fontWeight: 400,
                                    fontSize: { md: "20px", xs: "14px" },
                                    lineHeight: "140%",
                                    color: "#fff",
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/assets/Svg/tick.svg"
                                    sx={{ width: 20, height: 20, mr: 1 }}
                                />
                                {item}
                            </Typography>
                        )
                    )}
                </Box>


            </Box>


        </Container>
    );
}
