import AboutHero from '../corporate-bonds';
import ListedCorporateBonds from '../corporate-info';
import InvestmentStats from '../cards'
import WhyInvest from '../WhyInvest'
import CreditAssessmentProcess from '../creditprocess'
import RiskMitigation from '../riskmigration'
import Question from'../question'

export default function AboutView() {
  return (
    <>
        <AboutHero />

      <ListedCorporateBonds/>

      <InvestmentStats/>

      <WhyInvest/>

      <CreditAssessmentProcess/>
     
     <RiskMitigation/>

     <Question/>
      

    </>
  );
}
