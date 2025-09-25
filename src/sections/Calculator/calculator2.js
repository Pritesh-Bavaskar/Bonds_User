import React from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    Paper,
    Chip,
    useTheme,
    useMediaQuery,
} from "@mui/material";
// import { Calculate } from "@mui/icons";
import { useNavigate } from 'react-router-dom';


export default function BondsCalculatorHero2() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                mt: 5,
                width: "100%",
                height: { xs: 320, md: 444 },
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 6,
            }}
        >
            <Paper

                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 3,
                    textAlign: "center",

                }}
            >
                <Grid container spacing={2} direction="column" alignItems="center">


                    {/* Title */}
                    <Grid item>
                        <Typography
                        fontFamily='public Sans, sans-serif'
                            fontWeight={700}
                            gutterBottom
                            fontSize='36px'
                            color='primary.main'
                        >
                            Ready to Calculate Your Bond Returns?
                        </Typography>
                    </Grid>

                    {/* Subtitle */}
                    <Grid item>
                        <Typography
                            sx={{
                                fontFamily: 'Public Sans, sans-serif',
                                fontWeight: 400,
                                fontSize: { md: '20px', xs: '18px' }, // optional: smaller on mobile
                                lineHeight: '140%',
                                letterSpacing: '0',
                                textAlign: 'center',
                                color: 'text.primary',
                            }}
                        >
                            Join thousands of investors who trust our calculator for accurate bond analysis and planning.
                        </Typography>
                    </Grid>

                    {/* Button */}
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/calculate')}
                            size={isMobile ? "medium" : "large"}
                            sx={{
                                bgcolor: 'primary.main',
                                mt: 1,
                                px: 4,
                                py: 1.2,
                                fontWeight: 600,
                                fontSize: { xs: "0.85rem", md: "1rem" },
                                gap: 1,
                                "&:hover": {
                                    bgcolor: 'primary.main',
                                    bordershadow: 'none',
                                }
                            }}
                        >
                            <img src='/assets/Svg/vector.svg' alt='calci' style={{ width: 20, height: 20, }} />
                            Start Calculating
                        </Button>


                        <Grid
                            sx={{
                              
                                fontFamily: 'Public Sans, sans-serif',
                                fontWeight: 400,
                                fontSize: { md: '20px', xs: '14px' }, // optional: smaller on mobile
                                lineHeight: '140%',
                                letterSpacing: '0',
                                textAlign: 'center',
                                color: 'text.primary',
                                display: 'flex',
                                flexdirection: 'row',
                                alignItems: 'center',
                                gap: 4,
                                m: 4,
                            }}>
                            {["Free to use", "No registration required", "Professional accuracy"].map
                                ((item) => (
                                    <Typography>

                                        <Box
                                            component="img"
                                            src="/assets/Svg/tick.svg"
                                            sx={{ width: 20, height: 20, mb: 0.4, mr: 0.5 }}
                                        />
                                        {item}
                                    </Typography>

                                ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
