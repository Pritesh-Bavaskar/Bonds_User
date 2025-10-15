import { Container } from '@mui/material';
import BondDetailsHero from '../bond-details-hero';
import BondDetailsCalculateReturns from '../bond-details-calculate-returns';
import HomeWhyBonds from 'src/sections/home/home-why-bonds';
import BondDetailsAboutCompany from '../bond-details-about-company';
import BondDetailsFinancialRating from '../bond-details-financial-rating';
import BondDetailsRatioAnalysis from '../bond-details-ratio-analysis';
import BondDetailsCompanyFinancials from '../bond-details-company-financials';
import { useGetBond, useGetSimilarBonds } from 'src/api/bonds';
import { useParams } from 'react-router-dom';

export default function BondDetailsView() {
  const { id } = useParams();
  const { Bond } = useGetBond(id);
  const { SimilarBonds } = useGetSimilarBonds(id);
  console.log('Bond', Bond);
  console.log('SimilarBonds', SimilarBonds);
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BondDetailsHero bond={Bond} />
      <BondDetailsCalculateReturns bond={Bond}/>
      <BondDetailsCompanyFinancials />
      <BondDetailsRatioAnalysis />
      <BondDetailsAboutCompany bond={Bond} />
      <BondDetailsFinancialRating />
      <HomeWhyBonds isDetails bonds={SimilarBonds} />
    </Container>
  );
}
