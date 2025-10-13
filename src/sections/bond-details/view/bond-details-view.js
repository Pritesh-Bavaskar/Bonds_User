import { Container } from '@mui/material';
import BondDetailsHero from '../bond-details-hero';
import BondDetailsCalculateReturns from '../bond-details-calculate-returns';
import HomeWhyBonds from 'src/sections/home/home-why-bonds';
import BondDetailsAboutCompany from '../bond-details-about-company';
import BondDetailsFinancialRating from '../bond-details-financial-rating';
import BondDetailsRatioAnalysis from '../bond-details-ratio-analysis';
import BondDetailsCompanyFinancials from '../bond-details-company-financials';

export default function BondDetailsView() {
  
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BondDetailsHero />
      <BondDetailsCalculateReturns />
      <BondDetailsCompanyFinancials />
      <BondDetailsRatioAnalysis />
      <BondDetailsAboutCompany />
      <BondDetailsFinancialRating />
      <HomeWhyBonds isDetails />
    </Container>
  );
}
