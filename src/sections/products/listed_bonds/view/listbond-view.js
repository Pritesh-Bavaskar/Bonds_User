import Advantage from "../advantage";
import Benefits from "../benefits";
import FAQSection from "../faqquestion";
import Investment from "../investment";
import Listedbond from "../listedbond";
import Listedcards from "../listedcards";
import ListedInfo from "../listedinfo";
import ListedJourney from "../listedjourney";
import RisksConsiderations from "../risksconsiderations";


export default function AboutView() {
  return (
    <>
    <Listedbond/>
    <ListedInfo/>
    <Listedcards/>
    <Benefits/>
    <Advantage/>
    <Investment/>
    <RisksConsiderations/>
    <FAQSection/>
     <ListedJourney/>


    </>
  );
}
