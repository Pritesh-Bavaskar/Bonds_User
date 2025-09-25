import React from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const accordionItems = [
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
                <Typography sx={{

                    fontFamily: "Public Sans, sans-serif",
                    fontSize: '48px',
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
                {accordionItems.map((item, index) => (
                    <Accordion key={index} disableGutters sx={{ mb: 2, borderRadius: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
                            <Typography fontWeight={500}>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                {item.content}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
};

export default CreditAssessmentProcess;
