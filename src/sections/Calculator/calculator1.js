import React from "react";
import {
    Box,
    Grid,
    Typography,
    Stack,
    Avatar,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelineIcon from "@mui/icons-material/Timeline";
import CalculateIcon from "@mui/icons-material/Calculate";
import InsightsIcon from "@mui/icons-material/Insights";
import calculatorImg from "src/images/calculator.png";

const features = [
    {
        icon: <CalculateIcon />,
        title: "Accurate Planning",
        desc: "Get precise calculations for bond returns, yields, and maturity amounts with real-time market data.",
        color: "#0BA02C",
    },
    {
        icon: <TimelineIcon />,
        title: "Quick Projections",
        desc: "Instantly visualize your investment growth with interactive charts and detailed breakdowns.",
        color: "#1976D2",
    },
    {
        icon: <AccessTimeIcon />,
        title: "Save Time",
        desc: "Skip complex manual calculations and get results in seconds with our automated tools.",
        color: "#FF8800",
    },
    {
        icon: <InsightsIcon />,
        title: "Smart Decisions",
        desc: "Compare different bond options and make informed investment choices backed by data.",
        color: "#C2185B",
    },
];

export default function BondsCalculatorHero1() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                px: { xs: 2, md: 4 },
                py: { xs: 4, md: 8 },
                maxWidth: 1200,
                mx: 'auto', // 👈 center horizontally
                bgcolor: "background.default",
            }}
        >
            <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="space-between"
            >
                {/* Left Content */}
                <Grid item xs={12} md={6}
                    sx={{
                        width: { md: '532px' },
                        height: { md: '411px' },
                    }}>
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        fontWeight={700}
                        color="primary"
                        mb={3}
                    >
                        Why Use a Bonds Calculator?
                    </Typography>

                    <Stack spacing={1}>
                        {features.map((item) => (
                            <Stack key={item.title} direction="row" spacing={2} alignItems="flex-start">
                                <Avatar
                                    sx={{
                                        bgcolor: item.color,
                                        width: 32,
                                        height: 32,
                                    }}
                                >
                                    {item.icon}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600}
                                        sx={{
                                        color:'primary.main',
                                       
                                        fontWeight:'700',
                                        fontSize:'14px',
                                        fontFamily:'lato'
                                    }}>
                                        {item.title}
                                    </Typography>
                                    <Typography
                                     sx={{
                                        color:'primary.main',
                                        mt: 0.3,
                                        fontWeight:'700',
                                        fontSize:'14px',
                                        fontFamily:'lato'
                                    }}
                                      
                                       
                                    >
                                        {item.desc}
                                    </Typography>
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                </Grid>

                {/* Right Image */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={calculatorImg}
                        alt="Bonds Calculator"
                        sx={{
                            width: "100%",
                            maxWidth: 600,
                            height: "auto",
                            borderRadius: 2,
                            boxShadow: 3,
                            display: "block",
                            mx: isMobile ? "auto" : 0,
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
