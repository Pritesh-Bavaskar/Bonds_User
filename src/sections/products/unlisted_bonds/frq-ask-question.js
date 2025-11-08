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
    question: 'Who can invest in unlisted bonds?',
    answer:
      'Typically, accredited investors or high-net-worth individuals (HNIs) can invest in unlisted bonds, as these are private placements.',
  },
  {
    question: 'How is pricing determined for unlisted bonds?',
    answer:
      'Pricing is negotiated between the issuer and the investor and may reflect prevailing market conditions and credit risk.',
  },
  {
    question: 'What are the tax implications?',
    answer:
      'Interest earned on unlisted bonds is taxable according to your income tax slab. Capital gains tax may also apply if sold before maturity.',
  },
  {
    question: 'What makes unlisted bonds different from listed bonds?',
    answer:
      'Unlisted bonds are not traded on an exchange, have limited transparency, lower liquidity, and often offer higher yields compared to listed bonds.',
  },
];

export default function FAQSection() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 8, md: 12 },
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
          Get answers to common questions about unlisted bond investments and private placements.
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
