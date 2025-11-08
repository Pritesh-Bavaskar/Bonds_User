// src/components/BondsCalculatorContent.jsx
import React from "react";
import { Box, Container, Typography, List, ListItem, Grid } from "@mui/material";

export default function BondsCalculatorContent() {
  return (
    <Container maxWidth="lg" sx={{
      py: 6,
      maxWidth: '100%',
      width: '100%',
      height: '2000px',
    }}>

      <Typography fontWeight={700} gutterBottom
        sx={{
          mt: 8,
          color: 'primary.main',
          fontSize: '24px',
          fontFamily: 'Lato',
          fontWeight: 700,
        }}>
        Bonds Calculator – Your Toolkit for Smarter Fixed-Income Investing
      </Typography>
      <Typography paragraph sx={{
          fontWeight: '400',
          fontFamily: 'lato',
        fontSize: '20px',
        lineHeight: '128%',
      }}>
        Investing in bonds is one of the most reliable ways to build steady and predictable wealth. Whether you’re a beginner or an experienced investor, bonds offer fixed interest income and lower risk compared to equities. <br></br>
        But how do you estimate the potential growth of your bond investments?
        That’s where our Bond Calculator comes in. This tool helps you project the future value of your investment based on inputs like your monthly investment amount, expected rate of return, and investment tenure.
      </Typography>

      <Box
        sx={{
          width: '1133px',
          height: '282px',
        }}
      >
        <Typography
          fontWeight={700}
          sx={{
            mt: 4,
            color: 'primary.main',
            fontSize: '24px',
            lineHeight: '82%',
            fontFamily: 'Lato',
          }}
        >
          How a Bond Calculator Empowers Your Financial Planning
        </Typography>

        <Typography
          paragraph
          sx={{
            pt: 3,
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '128%',
            fontFamily: 'Lato',
          }}
        >
          Our Bond Calculator provides instant return projections based on your chosen details.
        </Typography>

        <Typography
          paragraph
          sx={{
            pt: 1,
            fontWeight: 600,
            fontFamily: 'Lato',
            fontSize: '20px',
            lineHeight: '128%',
            fontFamily: 'Lato',
          }}
        >
          Key Features
        </Typography>
        <Box sx={{ pl: 2 }}>
          {[
            "Quick Projections: Get an accurate estimate of your total expected returns and final investment value instantly.",
            "Scenario Analysis: Change your investment amount, expected rate, or time period to see how your wealth grows in different situations.",
            "User-Friendly Interface: Simple sliders make it easy to adjust values without any complexity.",
            "Visual Clarity: A chart clearly shows how much is your total investment vs. estimated returns."
          ].map((text, i) => (
            <Typography
              key={i}
              sx={{
                maxWidth: '1133px',
                fontFamily: "Lato",
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "150%",
                position: "relative",
                pl: 3, // padding left for space after bullet
                "&::before": {
                  content: '"•"',
                  position: "absolute",
                  left: 0,
                  color: "primary.main", // change bullet color if you like
                  fontSize: "24px",
                  lineHeight: "20px",
                },
              }}
            >
              {text}
            </Typography>
          ))}
        </Box>
      </Box>


      <Box>

        <Typography sx={{
          mt: 8,
          color: 'primary.main',
          fontSize: '24px',
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 700,
        }}>
          How Does the Bond Calculator Work?
        </Typography>
        <Typography
          sx={{
            fontFamily: 'lato',
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "128%",
            mt: 4,
          }}
        >
          Bond investments typically offer fixed interest (coupon) on your invested
          amount. The calculator uses the formula for compound interest to give you
          projected returns:
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "128%",

          }}
        >
          Future Value (FV) = P × (1 + r/n)<sup>n × t</sup>
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "128%",

          }}
        >
          Where:
        </Typography>

        <Box sx={{ pl: 2 }}>

          {[
            " P = Principal or investment amount",
            "r = Annual rate of interest (expected return)",
            " n = Number of times interest is compounded per year (generally annual for bonds)",
            "t = Time period in years"].map((text, i) => (
              <Typography
                key={i}
                sx={{
                  fontFamily: "Lato",
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  position: "relative",
                  pl: 3, // padding left for space after bullet
                  "&::before": {
                    content: '"•"',
                    position: "absolute",
                    left: 0,
                    color: "primary.main", // change bullet color if you like
                    fontSize: "24px",
                    lineHeight: "20px",
                  },
                }}
              >
                {text}
              </Typography>))}

        </Box>
      </Box>

      <Typography sx={{
        mt: 8,
        color: 'primary.main',
        fontSize: '24px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
      }}>
        Example Calculation
      </Typography>
      <Typography paragraph>
        Let’s say you invest ₹30,000 per month in bonds for 11 years with an expected return of 9% annually.
      </Typography>
      <List sx={{ pl: 2 }}>
        <ListItem>Total Investment: ₹39,60,000</ListItem>
        <ListItem>Estimated Returns: ₹28,15,684</ListItem>
        <ListItem>Maturity Value: ₹67,75,684</ListItem>
      </List>

      <Typography fontWeight={700} gutterBottom
        sx={{
          mt: 8,
          color: 'primary.main',
          fontSize: '24px',
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 700,
        }}>
        Advantages of Using the Bond Calculator
      </Typography>
      <Typography paragraph sx={{
        fontWeight: '400',
        fontFamily: 'lato',
        fontSize: '20px',
        lineHeight: '128%',
      }}>
        
  
      </Typography>
        <List sx={{ pl: 3 }}>
        <ListItem>✅ Accurate Planning: Remove guesswork and clearly see the growth of your bond portfolio.</ListItem>
        <ListItem>
         ✅ Time-Saving: No manual calculations—get results instantly.
        </ListItem>
        <ListItem>
           ✅ Better Decision-Making: Compare different tenures, rates, and amounts before investing.
        </ListItem>
        <ListItem>
         ✅ Visual Insight: Graphs show the proportion of your investment vs. returns.
        </ListItem>
        <ListItem>
         ✅ Customizable Goals: Try multiple scenarios to match your financial goals.
        </ListItem>
      </List>


      <Typography
        sx={{
          mt: 4,
          color: 'primary.main',
          fontSize: '24px',
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 700,
        }}
      >
        FAQs About Bonds Calculator
      </Typography>
      <List sx={{ pl: 3 }}>
        <ListItem>1. .</ListItem>
        <ListItem>
          2. Tenure options: short (1–3 yrs), medium (5–7 yrs), long (10–15 yrs).
        </ListItem>
        <ListItem>
          3. Are returns guaranteed? → Govt bonds are, corporate depend on issuer.
        </ListItem>
        <ListItem>
          4. Expected return: 6–8% govt, 8–12% corporate, 6–10% bond funds.
        </ListItem>
        <ListItem>
          5. Can I exit early? → Some bonds allow secondary market exit.
        </ListItem>
      </List>
    </Container>
  );
}

