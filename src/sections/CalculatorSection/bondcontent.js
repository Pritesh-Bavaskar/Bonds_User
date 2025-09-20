// src/components/BondsCalculatorContent.jsx
import React from "react";
import { Box, Container, Typography, List, ListItem } from "@mui/material";
import { fontSize, fontWeight } from "@mui/system";

export default function BondsCalculatorContent() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <typography 
      sx={{
        color:'primary.main',
        fontWeight:'600',
        display:'flex',
        

        }}>
          Bonds Calculator
          </typography>
      <Typography variant="h5" fontWeight={700} gutterBottom
      sx={{
         color:"primary.main"
      }}>
        Bonds Calculator – Your Toolkit for Smarter Fixed-Income Investing
      </Typography>
      <Typography paragraph>
        Investing in bonds is one of the most reliable ways to build steady and
        predictable wealth. Whether you're a beginner or an experienced investor,
        bonds offer fixed income and lower risk compared to equities.
      </Typography>

      <Typography variant="h6" fontWeight={600} sx={{ mt: 4 }}>
        How a Bond Calculator Empowers Your Financial Planning
      </Typography>
      <Typography paragraph>
        Our Bond Calculator provides instant return projections based on your
        chosen details.
      </Typography>
      <List sx={{ pl: 3 }}>
        <ListItem>✅ Quick Projections for returns and value.</ListItem>
        <ListItem>✅ Scenario Analysis with sliders.</ListItem>
        <ListItem>✅ User-Friendly Interface.</ListItem>
        <ListItem>✅ Visual Clarity with charts.</ListItem>
      </List>

      <Typography variant="h6" fontWeight={600} sx={{ mt: 4 }}>
        Example Calculation
      </Typography>
      <Typography paragraph>
        Suppose you invest ₹30,000 per month for 11 years with 9% annual returns:
      </Typography>
      <List sx={{ pl: 3 }}>
        <ListItem>Total Investment: ₹39,60,000</ListItem>
        <ListItem>Estimated Returns: ₹28,15,684</ListItem>
        <ListItem>Maturity Value: ₹67,75,684</ListItem>
      </List>

      <Typography variant="h6" fontWeight={600} sx={{ mt: 4 }}>
        FAQs
      </Typography>
      <List sx={{ pl: 3 }}>
        <ListItem>1. Minimum amount to invest? → ₹10,000 in most bonds.</ListItem>
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
