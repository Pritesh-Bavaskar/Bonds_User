import React from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

const FAQS  = [
    {
        title: 'Corporate Governance',
        content: 'Assessment of leadership practices, ethical standards, board structure, and regulatory compliance.'
    },
    {
        title: 'Company Background',
        content: 'Evaluation of the company’s history, reputation, and previous track record in the market.'
    },
    {
        title: 'Financial Strength',
        content: 'Detailed analysis of financial statements, cash flows, debt levels, and profitability ratios.'
    },
    {
        title: 'Business Model',
        content: 'Understanding the revenue generation mechanism, scalability, and competitive advantage.'
    }
];

const CreditAssessmentProcess = () => {
      const theme = useTheme();
    return (
        <Box
            sx={{
                mx: 'auto',
                maxWidth: '1129px',
                height: '601px',
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                bgcolor: "background.default",
                px: 2
            }}
        >
            <Box
                sx={{
                    width: '888px',
                    maxWidth: "100%",
                    mx: 'auto',
                    alignItems: 'center',
                    mb: 8,
                    textAlign: 'center',
                    fontFamily: "Public Sans, sans-serif",

                }}
            >
                <Typography variant='h3'
                sx={{

                    fontFamily: "Public Sans, sans-serif",
                
                    lineHeight: '64px',
                    fontWeight: 700,
                    color: 'primary.main',

                }}>
                    Credit Assessment Process
                </Typography>
                <Typography
                    sx={{
                        height: '61px',
                        fontSize: '20px',
                        fontWeight: 400,
                        fontFamily: "Public Sans, sans-serif",
                    }}>
                    Our rigorous evaluation framework ensures only the highest quality corporate bonds make it to our platform.
                </Typography>
            </Box>
            <Box sx={{ maxWidth: "1200px" }}>
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
              {faq.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#fafbfc' }}>
            <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.98rem' }}>
              {faq.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
            </Box>
        </Box>
    );
};

export default CreditAssessmentProcess;
