import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { m } from "framer-motion";

import check from 'src/images/check.png'
import liquidity from 'src/images/liquidity.png'
import calendar from 'src/images/calender.png'
import security from 'src/images/security.png'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 }
};

const hoverEffect = {
  scale: 1.04,
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
};

const RiskMitigation = () => {
  const factors = [
    {
      title: "SEBI Regulate",
      desc: "All offerings comply with SEBI regulations ensuring investor protection",
      icon: check,
    },
    {
      title: "Financial Covenants",
      desc: "Strict financial covenants and monitoring mechanisms in place",
      icon: liquidity,
    },
    {
      title: "Exchange Liquidity",
      desc: "Listed on NSE/BSE for transparent pricing and easy exit",
      icon: calendar,
    },
    {
      title: "Secured Guarantees",
      desc: "Corporate guarantees and collateral backing for enhanced security",
      icon: security,
    },
  ];

  return (
    <Box sx={{
      p: 4, textAlign: "center",
      mx: 'auto',
      maxwidth: '100%',
    }}>
      {/* Heading */}
      <m.div
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <Box sx={{
          maxwidth: '888px',
          maxheight: '153px',
        }}>
          <Typography variant='h3'
            sx={{
              fontFamily: 'public sans',
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            Risk Mitigation Factors
          </Typography>
          <Typography
            sx={{
              fontFamily: 'public sans',
              fontSize: '20px',
              fontWeight: 400,
              py: 3
            }}
          >
            Multiple layers of protection and oversight ensure your investment security and peace of mind.
          </Typography>
        </Box>
      </m.div>
      <Box sx={{
        maxWidth: { xs: '800px', md: '900px' }, mx: 'auto',
      }}>
        {/* Cards Grid */}
        <Grid container spacing={3} justifyContent="center">
          {factors.map((factor, index) => (
            <Grid item xs={12} sm={6} md={5} key={index}>
              <m.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={hoverEffect}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    width: { xs: '300px', md: '360px' },
                    height: '102px',
                    ml: { xs: 0, lg: 0 },
                    p: { xs: 2, md: 2 },
                    borderRadius: 2,
                    gap:2,
                    boxShadow: 4,
                    textAlign: "left",
                    display: "flex",
                    alignItems: "flex-start",
                    bgcolor: '#F4F4F4',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                  }}
                >
                  <Box
                    component="img"
                    src={factor.icon}
                    alt={factor.title}
                    sx={{ width: 40, height: 40 }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <Typography sx={{
                      fontWeight: "400",
                      fontFamily: 'Public Sans, sans-serif',
                      fontSize: '20px',
                      color: 'black',
                    }} >
                      {factor.title}
                    </Typography>
                    <Typography color="text.secondary"
                      sx={{
                        fontWeight: "300",
                        fontFamily: 'Public Sans',
                        fontSize: '12px',
                      }} >
                      {factor.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default RiskMitigation;