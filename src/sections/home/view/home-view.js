import { useScroll } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// components
import ScrollProgress from 'src/components/scroll-progress';
//
import HomeHero from '../home-hero';
import HomeStats from '../home-stats';
import HomeWhatBonds from '../home-what-bonds';
import HomeWhyBonds from '../home-why-bonds';
import HomeExplore from '../home-explore';
import HomeSignupRequest from '../home-signup-request';
import HomeFeaturedBlogs from '../home-fearured-blogs';
import HomeGetStartedKYC from '../home-getstarted-kyc';
import { useGetFeaturedBonds } from 'src/api/bonds';
import FaqsComponent from 'src/sections/faqs/faq-component';
import StartInvesting from './start-investing';
// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  const { featuredBonds } = useGetFeaturedBonds();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />
      <HomeStats />
      <HomeWhatBonds />
      <HomeWhyBonds bonds={featuredBonds} />
      <HomeGetStartedKYC />
      <HomeFeaturedBlogs />
      {/* <HomeExplore /> */}
      <HomeSignupRequest />
      <StartInvesting/>
      <FaqsComponent />
    </>
  );
}
