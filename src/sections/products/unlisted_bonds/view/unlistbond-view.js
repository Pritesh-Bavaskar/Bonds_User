import UnListBonds from "../unlisted-bonds";
import AboutUnListBond from "../AboutUnlistBond";
import Benifit from "../benifits";
import KeyFact from "../key_fact";
import Gov_securities_type from "../typeof_gov_securities";
import BondIntvesment from "../bond-investment";
import RiskConsideration from "../risk-consideration";
import FAQSection from "../frq-ask-question";
import LearnMoreCard from "../Learn-More-Card";
import ListUnlistBond from "../list-unlist-bond";

export default function UnListedBondView() {
  return (
    <>
      <AboutUnListBond />

      <UnListBonds /> 

      <KeyFact />

      <Benifit />

      <ListUnlistBond />

      <RiskConsideration />

      <BondIntvesment />

      <FAQSection />

      <LearnMoreCard />

    </>
  );
}
