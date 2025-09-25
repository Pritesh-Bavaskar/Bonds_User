import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

import check from 'src/images/check.png'
import liquidity from 'src/images/liquidity.png'
import calendar from 'src/images/calender.png'
import security from 'src/images/security.png'


const RiskMitigation = () => {
  const factors = [
    {
      title: "SEBI Regulate",
      desc: "All offerings comply with SEBI regulations ensuring investor protection",
      icon: check ,
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
    <Box sx={{ p: 4, textAlign: "center",
      mx:'auto',
      maxwidth:'1200px',
      
     }}>
      {/* Heading */}
      <Box sx={{
        maxwidth:'888px',
        maxheight:'153px',

      }}>
      <Typography
      sx={{
fontFamily:'public sans',
         fontSize:'48px',
        fontWeight:700,
        color:"primary.main",
        
      }}
       
      >
        Risk Mitigation Factors
      </Typography> 

        <Typography
       sx={{
        fontFamily:'public sans',
        fontSize:'20px',
        fontWeight:400,
        pb:10
      }}
        
      >
        Multiple layers of protection and oversight ensure your investment security and peace of mind.
      </Typography>
   </Box>
   <Box sx={{
    maxWidth:'1200px', mx:'auto',
   }}>
      {/* Cards Grid */}
      <Grid container spacing={3} justifyContent="center">
        {factors.map((factor, index) => (
          <Grid item xs={12} sm={6} md={5} key={index}>
            <Card
              sx={{
                width:'351px',
                height:'102px',
                ml:4, 
                p: 2, 
                borderRadius: 2,
                boxShadow: 4,
                textAlign: "left",
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                bgcolor:'#F4F4F4',
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
                  fontWeight:"400",
                  fontFamily:'Public Sans, sans-serif',
                  fontSize:'20px',
                  color:'black',
                }} >
                  {factor.title}
                </Typography>
                <Typography  color="text.secondary"
                 sx={{
                    fontWeight:"300",
                  fontFamily:'Public Sans',
                  fontSize:'12px',
                  
                }} >
                 
                
                  {factor.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>
    </Box>
  );
};

export default RiskMitigation;
