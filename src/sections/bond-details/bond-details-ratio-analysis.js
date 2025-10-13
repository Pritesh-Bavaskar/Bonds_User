import { Container, Box, Typography, useTheme, Grid } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import BondDetailsRatioAnalysisCard from './bond-details-ratio-analysis-card';

const ratioAnalysisData = [
  {
    id: 1,
    title: 'Revenue Growth',
    value: '12.5%',
    status: 'Good',
    benchmark: 'Sector Average: 8.2%',
    description: 'Year-over-year revenue growth showing strong performance'
  },
  {
    id: 2,
    title: 'PAT Margin',
    value: '18.3%',
    status: 'Good',
    benchmark: 'Sector Average: 15.7%',
    description: 'Healthy profit after tax margin'
  },
  {
    id: 3,
    title: 'Debt to Equity',
    value: '1.2x',
    status: 'Moderate',
    benchmark: 'Sector Average: 1.5x',
    description: 'Conservative capital structure'
  }
];

export default function BondDetailsRatioAnalysis() {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Box sx={{ pt: { xs: 6, md: 12 } }}>
      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h4"
          sx={{
            fontWeight: 700,
            fontStyle: 'Bold'
          }}
        >
          Ratio Analysis
        </Typography>
        <Typography variant="h5" sx={{ color: 'text.secondary', mt: 2, mb: 4 }}>
          Detailed financial metrics including Revenue, PAT, Debt, and Net Worth
        </Typography>
        
        <Grid container spacing={3}>
          {ratioAnalysisData.map((item) => (
            <Grid item xs={12} md={12} key={item.id}>
              <BondDetailsRatioAnalysisCard
                title={item.title}
                value={item.value}
                status={item.status}
                benchmark={item.benchmark}
                description={item.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
