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
    question: "What is a G-Sec?",
    answer: "A G-Sec (Government Security) is a tradable instrument issued by the Central or State Government."
  },
  {
    question: "Can I sell government bonds before maturity?",
    answer: "Yes, government bonds can be sold in the secondary market before maturity, subject to market liquidity."
  },
  {
    question: "How is interest from government bonds taxed?",
    answer: "Interest from government bonds is taxable as per your income tax slab. Please consult your tax advisor."
  },
  {
    question: "What is the minimum investment amount?",
    answer: "The minimum investment amount varies by bond type, but is typically ₹10,000."
  }
];

export default function FAQSection() {
  const theme = useTheme();

  return (
    <Container 
      component={MotionViewport}
      sx={{
        py: { xs: 7, md: 7 },
        maxWidth: { xs: '100% !important', md: '1000px !important' }, // increased size
      }} 
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 3,
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4
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
            width: '100%' // let it take full width of container
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`faq-content-${idx}`}
            id={`faq-header-${idx}`}
            sx={{
              '& .MuiAccordionSummary-content': { my: 0.5 }
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
              {faq.question}
            </Typography>
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
