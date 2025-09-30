import GovSecurities from "../govSecurities";
import AboutGov from "../AboutGov";
import Benifit from "../benifits";
import KeyFact from "../key_fact";
import Gov_securities_type from "../typeof_gov_securities";
import BondIntvesment from "../bond-investment";
import InvesterNotes from "../invester_notes";
import FAQSection from "../frq-ask-question";
import LearnMoreCard from "../Learn-More-Card";


export default function AboutView() {
  return (
    <>
      <AboutGov />

      <GovSecurities />

      <KeyFact />

      <Benifit />

      <Gov_securities_type /> 

      <BondIntvesment />

      <InvesterNotes />

      <FAQSection />

      <LearnMoreCard />

    </>
  );
}
