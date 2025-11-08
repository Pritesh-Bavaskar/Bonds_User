import { m } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { MotionViewport, varFade } from 'src/components/animate';

const FAQS = [
  {
    question: 'What is the minimum investment for listed bonds?',
    answer:
      'The minimum investment depends on the bond and the exchange regulations. Typically, listed corporate bonds in India can be bought in lots of ₹10,000 or ₹1 lakh face value, though some retail-oriented issues allow smaller ticket sizes.',
  },
  {
    question: 'Can I redeem listed bonds before maturity?',
    answer:
      'Unlike fixed deposits, listed bonds cannot be prematurely redeemed with the issuer. However, investors can sell them on stock exchanges any time during trading hours at the prevailing market price, subject to liquidity.',
  },
  {
    question: 'How are listed bonds taxed in India?',
    answer:
      'Interest earned on listed bonds is taxed as per your income tax slab. If you sell bonds before maturity, capital gains tax applies: short-term gains (if held ≤12 months) are taxed at your slab rate, while long-term gains (held >12 months) are taxed at 10% without indexation.',
  },
  {
    question: 'What are the trading hours for listed bonds?',
    answer:
      'Listed bonds trade on NSE and BSE during normal market hours: Monday to Friday, 9:15 AM to 3:30 PM (IST), excluding exchange holidays.',
  },
];

export default function FAQSection() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 8, md: 10 },
        maxWidth: { xs: '100% !important', md: '1000px !important' }, // increased size
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 1,
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
          }}
        >
          Get answers to common questions about government bond investments.
        </Typography>
      </Box>

      {FAQS.map((faq, idx) => (
        <Accordion
          key={faq.question}
          sx={{
            mb: 2,
            boxShadow: 'none',
            border: '1px solid #eee',
            borderRadius: 1,
            '&:before': { display: 'none' },
            width: '100%', // let it take full width of container
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`faq-content-${idx}`}
            id={`faq-header-${idx}`}
            sx={{
              '& .MuiAccordionSummary-content': { my: 0.5 },
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#fafbfc' }}>
            <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.98rem' }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
