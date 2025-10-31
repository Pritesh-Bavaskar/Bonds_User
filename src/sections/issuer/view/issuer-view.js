import { useScroll } from 'framer-motion';
// @mui
// components
import ScrollProgress from 'src/components/scroll-progress';
//
import IssuerHero from '../issuer-hero';
import IssuerWhyChooseIssuerPro from '../issuer-why-choose-issuer-pro';
import IssuerGetStarted from '../issuer-get-started';
import IssuerSupport from '../issuer-support';
import IssuerRegistrationProcess from '../issuer-registration-process';
import IssuerUsingPlatform from '../issuer-using-platform';
// ----------------------------------------------------------------------

export default function IssuerView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <IssuerHero />
      <IssuerWhyChooseIssuerPro />
      <IssuerRegistrationProcess />
      <IssuerUsingPlatform />
      <IssuerGetStarted />
      <IssuerSupport />
    </>
  );
}
