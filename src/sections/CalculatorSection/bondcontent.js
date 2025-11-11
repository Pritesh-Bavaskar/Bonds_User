// src/components/BondsCalculatorContent.jsx
import React from 'react';
import { Box, Container, Typography, List, ListItem, Grid } from '@mui/material';
import FaqsComponent from '../faqs/faq-component';

export default function BondsCalculatorContent() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        sx={{
          mt: { md: 8, xs: 0 },
          color: 'primary.main',
          fontSize: '24px',
          fontWeight: 700,
        }}
      >
        Bonds Calculator – Your Toolkit for Smarter Fixed-Income Investing
      </Typography>
      <Typography
        sx={{
          fontWeight: '400',
          fontSize: '20px',
          lineHeight: '128%',
          pt: 3,
        }}
      >
        Investing in bonds is one of the most reliable ways to build steady and predictable wealth.
        Whether you’re a beginner or an experienced investor, bonds offer fixed interest income and
        lower risk compared to equities. But how do you estimate the potential growth of your bond
        investments? That’s where our Bond Calculator comes in. This tool helps you project the
        future value of your investment based on inputs like your monthly investment amount,
        expected rate of return, and investment tenure.
      </Typography>
      <Typography
        sx={{
          mt: 4,
          fontWeight: '700',
          color: 'primary.main',
          fontSize: '24px',
          lineHeight: '128%',
          pt: { md: 10, xs: 5 },
        }}
      >
        How a Bond Calculator Empowers Your Financial Planning
      </Typography>

      <Typography
        sx={{
          pt: 3,
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '128%',
        }}
      >
        Our Bond Calculator provides instant return projections based on your chosen details.
      </Typography>

      <Typography
        sx={{
          pt: 1,
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '128%',
        }}
      >
        Key Features
      </Typography>
      <Box sx={{ pl: 2 }}>
        {[
          'Quick Projections: Get an accurate estimate of your total expected returns and final investment value instantly.',
          'Scenario Analysis: Change your investment amount, expected rate, or time period to see how your wealth grows in different situations.',
          'User-Friendly Interface: Simple sliders make it easy to adjust values without any complexity.',
          'Visual Clarity: A chart clearly shows how much is your total investment vs. estimated returns.',
        ].map((text, i) => (
          <Typography
            key={i}
            sx={{
              maxWidth: '1133px',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '150%',
              position: 'relative',
              pl: 3,
              '&::before': {
                content: '"•"',
                position: 'absolute',
                left: 0,
                color: 'primary.main',
                fontSize: '24px',
                lineHeight: '20px',
              },
            }}
          >
            {text}
          </Typography>
        ))}
      </Box>

      <Box>
        <Typography
          sx={{
            mt: 8,
            color: 'primary.main',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 700,
          }}
        >
          How Does the Bond Calculator Work?
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '128%',
            mt: 4,
          }}
        >
          Bond investments typically offer fixed interest (coupon) on your invested amount. The
          calculator uses the formula for compound interest to give you projected returns:
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '128%',
          }}
        >
          Future Value (FV) = P × (1 + r/n)<sup>n × t</sup>
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '128%',
          }}
        >
          Where:
        </Typography>

        <Box sx={{ pl: 2 }}>
          {[
            ' P = Principal or investment amount',
            'r = Annual rate of interest (expected return)',
            ' n = Number of times interest is compounded per year (generally annual for bonds)',
            't = Time period in years',
          ].map((text, i) => (
            <Typography
              key={i}
              sx={{
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: '150%',
                position: 'relative',
                pl: 3, // padding left for space after bullet
                '&::before': {
                  content: '"•"',
                  position: 'absolute',
                  left: 0,
                  color: 'primary.main', // change bullet color if you like
                  fontSize: '24px',
                  lineHeight: '20px',
                },
              }}
            >
              {text}
            </Typography>
          ))}
        </Box>
      </Box>

      <Typography
        sx={{
          mt: 8,
          color: 'primary.main',
          fontSize: '24px',
          fontWeight: 700,
        }}
      >
        Example Calculation
      </Typography>
      <Typography sx={{ pt: 3 }}>
        Let’s say you invest ₹30,000 per month in bonds for 11 years with an expected return of 9%
        annually.
      </Typography>
      <List
        sx={{
          pl: 1,
          '& .MuiListItem-root': {
            position: 'relative',
            pl: 3,
            py: 0,
            m: 0,
            minHeight: 'auto',
            fontSize: { xs: '16px', md: '20px' },
            fontFamily: 'Lato',
            fontWeight: 400,
            lineHeight: '150%',
            '&::before': {
              content: '"•"',
              position: 'absolute',
              left: 0,
              color: '#000000',
              fontSize: '20px',
              lineHeight: 1,
            },
          },
        }}
      >
        <ListItem>Total Investment: ₹39,60,000</ListItem>
        <ListItem>Estimated Returns: ₹28,15,684</ListItem>
        <ListItem>Maturity Value: ₹67,75,684</ListItem>
      </List>
      <Typography>
        This means your money grows steadily with predictable income and lower risk compared to
        equity.
      </Typography>

      <Typography
        sx={{
          mt: 8,
          color: 'primary.main',
          fontSize: '24px',
          fontWeight: 700,
          pb: 3,
        }}
      >
        Advantages of Using the Bond Calculator
      </Typography>
      <Typography
        sx={{
          fontWeight: '400',
          fontSize: '20px',
          lineHeight: '128%',
        }}
      ></Typography>
      <List
        sx={{
          py: 0,
          m: 0,
          '& .MuiListItem-root': {
            py: 0,
            my: 0,
          },
        }}
      >
        <ListItem>
          ✅ Accurate Planning: Remove guesswork and clearly see the growth of your bond portfolio.
        </ListItem>
        <ListItem>✅ Time-Saving: No manual calculations—get results instantly.</ListItem>
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
      <FaqsComponent />
    </Container>
  );
}
