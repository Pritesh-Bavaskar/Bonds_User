 import { Helmet } from "react-helmet-async";

import BondsCalculatorHero from'src/sections/Calculator/calculator';
import BondsCalculatorHero1 from'src/sections/Calculator/calculator1';
import BondsCalculatorHero2 from 'src/sections/Calculator/calculator2';
import BondsCalculatorSection from 'src/sections/CalculatorSection/calculatorsection';
import BondsCalculatorContent from 'src/sections/CalculatorSection/bondcontent'

export default function calculatorpage(){
    return(
         <>
         <Helmet>
            <title> calculator </title>
         </Helmet>

        <BondsCalculatorHero/>
          <BondsCalculatorHero1/>
         <BondsCalculatorHero2/> 
        
       
     </>
    )
}