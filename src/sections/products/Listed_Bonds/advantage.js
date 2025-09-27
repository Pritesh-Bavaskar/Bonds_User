import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
// components
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const rows = [
    {
        feature: 'Trading Venue',
        listed: 'Stock Exchanges (NSE, BSE)',
        unlisted: 'Over-the-Counter (OTC)',
    },
    {
        feature: 'Liquidity',
        listed: 'High - Easy',
        unlisted: 'Low - Limited market',
    },
    {
        feature: 'Price Transparency',
        listed: 'Real-time market pricing',
        unlisted: 'Opaque pricing mechanism',
    },
    {
        feature: 'Regulatory Oversight',
        listed: 'SEBI regulated & monitored',
        unlisted: 'Limited regulatory oversight',
    },
    {
        feature: 'Minimum Investment',
        listed: '₹1,000 – ₹10,000',
        unlisted: '₹10 lakh – ₹1 crore',
    },
    {
        feature: 'Information Disclosure',
        listed: 'Mandatory public disclosures',
        unlisted: 'Limited information access',
    },
];

export default function Advantage() {
    const theme = useTheme();

    return (
        <Container
            component={MotionViewport}
            sx={{
                py: { xs: 10, md: 0 },
                textAlign: 'center',
            }}
        >
            {/* Title */}
            <m.div variants={varFade().inRight}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    <Box component="span" sx={{ color: 'primary.main' }}>
                        Listed vs Unlisted Bonds
                    </Box>
                </Typography>
            </m.div>

            {/* Subtitle */}
            <m.div variants={varFade().inUp}>
                <Typography
                    sx={{
                        maxWidth: 656,
                        fontWeight: 300,
                        height: 48,
                        mx: 'auto',
                        mb: 8,
                        mt: 2,
                        color: 'black',
                    }}
                >
                    Understanding the key differences to make informed investment decisions.
                </Typography>
            </m.div>

            {/* Table */}
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{bgcolor:'blue'}}>
                        <TableRow
                            sx={{
                                bgcolor: "linear-gradient(90deg, #00059A 0%, #3C6ADE 50%, #00059A 100%)",
                            }}
                        >
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Feature</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Listed Bonds</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Unlisted Bonds</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ bgcolor: 'white' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Feature</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Listed Bonds</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Unlisted Bonds</TableCell>
                        </TableRow>

                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ fontWeight: 'bold' }}>{row.feature}</TableCell>
                                <TableCell>{row.listed}</TableCell>
                                <TableCell>{row.unlisted}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* Footer Note */}
            <Box
                sx={{
                    mt: 3,
                    bgcolor: '#E6F0FF',
                    p: 2,
                    borderRadius: 1,
                    textAlign: 'center',
                }}
            >
                <Typography sx={{ fontWeight: 500 }}>
                    <strong>Winner:</strong> Listed bonds offer superior transparency, liquidity, and accessibility for most investors.
                </Typography>
            </Box>
        </Container>
    );
}
