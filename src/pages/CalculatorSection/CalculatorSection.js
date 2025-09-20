import { Helmet } from "react-helmet-async";

import BondsCalculatorSection from "src/sections/CalculatorSection/calculatorsection";
import BondsCalculatorContent from "src/sections/CalculatorSection/bondcontent";

export default function calculatorsection(){
return(
    <>
    <Helmet>
        <title>
            Calculator Section
        </title>
    </Helmet>

    <BondsCalculatorSection/>
    <BondsCalculatorContent/>

    </>
)
}