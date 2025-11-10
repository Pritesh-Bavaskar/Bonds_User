// @mui
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// _mock
import { _faqs } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function FaqsComponent() {
  return (
    <Box sx={{ py: { xs: 6, md: 15 } }}>
      <Box>
        <Typography
          variant="h1"
          sx={{ color: '#00328A', display: 'flex', justifyContent: 'center'}}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '140%',
            textAlign: 'center',
            maxWidth: '893px',
            margin: '0 auto',
            pb: '50px',
          }}
        >
          Get answers to common questions about unlisted bond investments and private placements.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: '893px', margin: '0 auto', pt: '20px',pb: '20px' }}>
        {_faqs.map((accordion) => (
          <Accordion key={accordion.id}>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
              <Typography variant="subtitle1">{accordion.heading}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>{accordion.detail}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
