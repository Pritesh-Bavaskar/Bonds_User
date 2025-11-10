import AboutHero from '../corporate-bonds';
import ListedCorporateBonds from '../corporate-info';
import InvestmentStats from '../cards';
import WhyInvest from '../WhyInvest';
import CreditAssessmentProcess from '../creditprocess';
import RiskMitigation from '../riskmigration';
import Question from '../question';
import BondLibraryQuestion from 'src/sections/bond-library/bond-library-question.js';

export default function CorpoBondView() {
  return (
    <>
      <AboutHero />

      <ListedCorporateBonds />

      <InvestmentStats />

      <WhyInvest />

      <CreditAssessmentProcess />

      <RiskMitigation />

      <BondLibraryQuestion />

      {/* <Question /> */}
    </>
  );
}
