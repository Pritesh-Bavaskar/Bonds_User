import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  List,
  ListItemButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import {
  Info,
  Person,
  TrendingUp,
  Settings,
  Business,
  AccountBalance,
  ExpandMore,
  ArrowBack,
} from '@mui/icons-material';

const faqData = {
  general: {
    title: 'General',
    subtitle: 'General information our platform',
    icon: Info,
    color: '#2196F3',
    questions: [
      {
        q: 'What are listed and unlisted bonds?',
        a: 'Listed bonds are traded on formal exchanges and have higher liquidity. Unlisted bonds are traded over-the-counter and may have lower liquidity but can offer unique investment opportunities.',
      },
      {
        q: 'Can I buy or sell stocks and bonds directly through this platform?',
        a: 'Yes, our platform allows you to buy and sell both stocks and bonds directly. You can place orders, track your portfolio, and manage your investments all in one place.',
      },
      {
        q: 'What is a bond maturity date and why is it important?',
        a: "The maturity date is when the bond issuer must repay the principal amount to bondholders. It's important because it determines your investment timeline and when you'll receive your principal back.",
      },
      {
        q: 'Are government bonds risk-free?',
        a: 'While government bonds are considered low-risk investments, they are not entirely risk-free. They carry minimal credit risk but are still subject to interest rate risk and inflation risk.',
      },
      {
        q: 'Are the prices shown on the website real-time?',
        a: 'Yes, we provide real-time pricing data for all listed securities. Prices are updated continuously during market hours to ensure you have the most current information.',
      },
      {
        q: 'What is the difference between stocks and bonds?',
        a: 'Stocks represent ownership in a company, while bonds are debt instruments. Stock investors share in profits and growth, while bondholders receive fixed interest payments and principal repayment.',
      },
      {
        q: 'Can beginners use this platform?',
        a: 'Absolutely! Our platform is designed for investors of all levels. We provide educational resources, intuitive tools, and customer support to help beginners start their investment journey.',
      },
      {
        q: 'Is there a cost to use the platform?',
        a: 'We charge competitive transaction fees for trades. Account maintenance is free, and we provide transparent pricing with no hidden charges. Detailed fee structure is available in your account settings.',
      },
    ],
  },
  account: {
    title: 'Account',
    subtitle: 'Account setup, verification, and management',
    icon: Person,
    color: '#00BCD4',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click the "Sign Up" button, provide your email, create a password, and follow the verification steps. You\'ll need to complete KYC requirements before trading.',
      },
      {
        q: 'What documents are needed for verification?',
        a: "You'll need a government-issued ID, proof of address, and PAN card. The verification process typically takes 24-48 hours.",
      },
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page, enter your registered email, and follow the instructions sent to your email to reset your password.',
      },
      {
        q: 'Can I have multiple accounts?',
        a: 'Each individual is permitted one primary account. However, you can open different account types (individual, joint) under the same profile.',
      },
    ],
  },
  investments: {
    title: 'Investments',
    subtitle: 'Investment process, payments, and portfolio tracking',
    icon: TrendingUp,
    color: '#9C27B0',
    questions: [
      {
        q: 'What is the minimum investment amount?',
        a: 'The minimum investment varies by security. For bonds, it typically starts from ₹10,000, while stocks can be purchased as per lot sizes or individual shares.',
      },
      {
        q: 'How do I track my portfolio performance?',
        a: 'Your dashboard provides real-time portfolio tracking with performance metrics, gains/losses, and detailed analytics. You can also set up custom alerts.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept bank transfers, UPI, net banking, and debit cards. All transactions are secured with bank-level encryption.',
      },
      {
        q: 'How long does it take to process withdrawals?',
        a: 'Withdrawal requests are typically processed within 1-3 business days, depending on your bank and the withdrawal method chosen.',
      },
    ],
  },
  technical: {
    title: 'Technical',
    subtitle: 'Platform security, browser support, and technical issues',
    icon: Info,
    color: '#F44336',
    questions: [
      {
        q: 'Is my data secure on this platform?',
        a: 'Yes, we use bank-grade 256-bit SSL encryption, two-factor authentication, and follow strict security protocols to protect your data and transactions.',
      },
      {
        q: 'Which browsers are supported?',
        a: 'We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated.',
      },
      {
        q: 'What should I do if I encounter a technical issue?',
        a: 'Contact our support team via chat, email, or phone. For urgent issues during trading hours, call our helpline for immediate assistance.',
      },
      {
        q: 'Is there a mobile app available?',
        a: 'Yes, our mobile app is available for both iOS and Android devices. Download it from the App Store or Google Play Store.',
      },
    ],
  },
  issuers: {
    title: 'Issuers',
    subtitle: 'Bond issuance process and requirements',
    icon: Business,
    color: '#FF9800',
    questions: [
      {
        q: 'Who can issue bonds on this platform?',
        a: 'Corporations, municipalities, and government entities can issue bonds after meeting our listing requirements and regulatory compliance standards.',
      },
      {
        q: 'What is the process to list bonds?',
        a: 'Submit an application with financial statements, credit ratings, and offering details. Our team will review and guide you through the regulatory approval process.',
      },
      {
        q: 'What are the fees for issuers?',
        a: 'Listing fees vary based on the size and type of issuance. Contact our issuer relations team for a detailed fee structure and consultation.',
      },
      {
        q: 'How long does the listing process take?',
        a: 'Typically 4-8 weeks, depending on documentation completeness, regulatory approvals, and the complexity of the bond structure.',
      },
    ],
  },
  bonds: {
    title: 'Bonds',
    subtitle: 'Basic information about bonds and their types',
    icon: Info,
    color: '#E91E63',
    questions: [
      {
        q: 'What types of bonds are available?',
        a: 'We offer government bonds, corporate bonds, municipal bonds, and tax-free bonds. Each type has different risk profiles and returns.',
      },
      {
        q: 'How is bond yield calculated?',
        a: 'Yield is the return on investment, calculated based on the coupon rate, purchase price, and time to maturity. We provide yield calculators on each bond listing.',
      },
      {
        q: 'Can I sell my bonds before maturity?',
        a: 'Yes, listed bonds can be sold in the secondary market. The price you receive will depend on current market conditions and interest rates.',
      },
      {
        q: 'What happens if a bond issuer defaults?',
        a: "In case of default, bondholders are prioritized in the repayment hierarchy. Recovery depends on the issuer's assets and bankruptcy proceedings.",
      },
    ],
  },
};

export default function FAQSystem() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setExpanded(null);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  if (!selectedCategory) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {Object.entries(faqData).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: '1px solid #e0e0e0',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                    height: '221px',
                    width: '280px',
                    borderRadius: '30px',
                    mx: 'auto',
                  }}
                  onClick={() => handleCategoryClick(key)}
                >
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45px',
                        height: '45px',
                        borderRadius: '10px',
                        bgcolor: `${category.color}15`,
                        mb: 2,
                      }}
                    >
                      <IconComponent sx={{ color: category.color, fontSize: 28 }} />
                    </Box>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }

  const currentCategory = faqData[selectedCategory];
  const IconComponent = currentCategory.icon;

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        bgcolor: '#FFFFFF',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Sidebar */}
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          width: { xs: '100%', md: 240 },
          bgcolor: 'white',
          p: 2,
          borderBottom: { xs: '1px solid #E9ECEE', md: 'none' },
        }}
      >
        <List>
          {Object.entries(faqData).map(([key, category]) => (
            <ListItemButton
              key={key}
              selected={selectedCategory === key}
              onClick={() => handleCategoryClick(key)}
              sx={{
                border: '1px solid #E9ECEE',
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: '#E9F5FF',
                  '&:hover': {
                    bgcolor: '#E9F5FF',
                  },
                },
              }}
            >
              <Typography variant="body1">{category.title}</Typography>
            </ListItemButton>
          ))}
        </List>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} md={9} flex={1} sx={{ width: '100%' }}>
        <Box sx={{ mb: 4, mt: 2 }}>
          <IconButton
            onClick={handleBackClick}
            sx={{
              mb: 2,
              padding: '0px 24px 0px 24px',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <ArrowBack />
          </IconButton>

          <Box
            sx={{
              width: '100%',
              bgcolor: '#E9F5FF',
              py: 2,
              px: 0,
            }}
          >
            <Grid container alignItems="center" spacing={2} sx={{ mb: 1, px: '24px' }}>
              <Grid item>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '45px',
                    height: '45px',
                    borderRadius: '10px',
                    bgcolor: `#FFFFFF`,
                  }}
                >
                  <IconComponent sx={{ color: currentCategory.color, fontSize: 24 }} />
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="h4" fontWeight="600">
                  {currentCategory.title}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ px: '24px', py: 0 }}>
          {currentCategory.questions.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleAccordionChange(`panel${index}`)}
              sx={{
                mb: 2,
                '&:before': { display: 'none' },
                boxShadow: 'none',
                border: '1px solid #e0e0e0',
                borderRadius: '8px !important',
                '&.Mui-expanded': { margin: '0 0 16px 0' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ '& .MuiAccordionSummary-content': { my: 1.5 } }}
              >
                <Typography variant="body1" fontWeight="500">
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Bottom Help Section */}
        <Grid container justifyContent="center" sx={{ mt: 4, px: 2 }}>
          <Grid
            item
            xs={12}
            sm={10}
            md="auto"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: '#DBEFFF',
              borderRadius: 2,
              boxShadow: 2,
              height: { md: '394px', xs: 'auto' },
              width: { md: '700px', xs: '100%' },
            }}
          >
            {/* Left Side */}
            <Stack
              direction="column"
              sx={{
                maxWidth: { md: '320px', xs: '100%' },
                paddingLeft: { md: '80px', xs: '0' },
                textAlign: { xs: 'center', md: 'left' },
                // paddingTop: { md: '75.5px', xs: 0 },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  lineHeight: '38px',
                  pt: { xs: '30px' },
                  px: { xs: '20px' },
                }}
              >
                Still Have Questions?
              </Typography>
              <Typography
                // variant="body2"
                color="text.secondary"
                sx={{
                  fontFamily: 'Public Sans',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '18px',
                  lineHeight: '25px',
                  pt: { xs: '30px', md: '20px' },
                  px: { xs: '20px' },
                }}
              >
                Our expert support team is available 24/7 to help you with any questions or issues.
              </Typography>
              <Grid sx={{ mt: '40px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ maxWidth: { md: '320px', xs: '100%' }, width: '240px' }}
                >
                  Start Chat
                </Button>
              </Grid>
            </Stack>

            {/* Right Side */}
            <Box
              sx={{ mt: { xs: 3, md: 0 }, paddingRight: { md: '50px', xs: 0 }, pb: { xs: '20px' } }}
            >
              <img
                src="/assets/images/faqs/faq-have-question.png"
                alt="Card"
                style={{ width: '290px', height: 'auto' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
