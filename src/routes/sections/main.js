import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
import SimpleLayout from 'src/layouts/simple';
import CompactLayout from 'src/layouts/compact';
// components
import { SplashScreen } from 'src/components/loading-screen';
import { element } from 'prop-types';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
const Page500 = lazy(() => import('src/pages/500'));
const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const FaqsPage = lazy(() => import('src/pages/faqs'));
const AboutPage = lazy(() => import('src/pages/about-us'));
const NewsInsightPage = lazy(() => import('src/pages/news-insights'));
const ContactPage = lazy(() => import('src/pages/contact-us'));
const PricingPage = lazy(() => import('src/pages/pricing'));
const PaymentPage = lazy(() => import('src/pages/payment'));
const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));
const BondLibraryPage = lazy(() => import('src/pages/bond-library'));
const BondDetailsPage = lazy(() => import('src/pages/bond-details/[id]'));
// PRODUCT
const ProductListPage = lazy(() => import('src/pages/product/list'));
const ProductDetailsPage = lazy(() => import('src/pages/product/details'));
const ProductCheckoutPage = lazy(() => import('src/pages/product/checkout'));
// BLOG
const PostListPage = lazy(() => import('src/pages/post/list'));
const PostDetailsPage = lazy(() => import('src/pages/post/details'));
//Calci
const Calculatorpage = lazy(() => import('src/pages/Calculator/calculator'));
const Calculatesection = lazy(() => import('src/pages/CalculatorSection/CalculatorSection'));

// const ProductGoBond = lazy(() =>
//   import('src/sections/products/government_bonds/view/govBond-view')
// );
// const ProductCoBond = lazy(() => import('src/sections/products/corporate_bonds/view/CopBond-view'));
// const ProductLiBond = lazy(() => import('src/sections/products/Listed_Bonds/view/LisBond-view'));
// const ProductUnLiBond = lazy(() =>
//   import('src/sections/products/UnListed_Bonds/view/unLiBond-view')
// );

// ----------------------------------------------------------------------

const ProductGoBond = lazy(() =>import('src/sections/products/government_bonds/view/govBond-view'));
const ProductCoBond = lazy(() =>import('src/sections/products/corporate_bonds/view/corporateBond-view'));
const ProductLiBond = lazy(() =>import('src/sections/products/listed_bonds/view/listbond-view'));
const ProductUnLiBond = lazy(() =>import('src/sections/products/unlisted_bonds/view/unlistbond-view'));
export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { path: 'calculator', element: <Calculatorpage /> },
      { path: 'calculate', element: <Calculatesection /> },
      { path: 'about-us', element: <AboutPage /> },
      { path: 'bond-library', element: <BondLibraryPage /> },
      { path: 'news-insight', element: <NewsInsightPage /> },
      { path: 'contact-us', element: <ContactPage /> },
      { path: 'faqs', element: <FaqsPage /> },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'checkout', element: <ProductCheckoutPage /> },
        ],
      },
      { 
        path: 'products',
        children: [
          { path: 'corporate_bond', element: <ProductCoBond /> },
          { path: 'government-bond', element: <ProductGoBond /> },
          { path: 'listed-bond', element: <ProductLiBond /> },
          { path: 'unlisted-bond', element: <ProductUnLiBond /> },
        ],
      },

      {
        path: 'post',
        children: [
          { element: <PostListPage />, index: true },
          { path: 'list', element: <PostListPage /> },
          { path: ':title', element: <PostDetailsPage /> },
        ],
      },
      {
        path: 'bond-details',
        children: [
          { path: ':id', element: <BondDetailsPage /> },
        ],
      },
    ],
  },
  {
    element: (
      <SimpleLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    ),
    children: [
      { path: 'pricing', element: <PricingPage /> },
      { path: 'payment', element: <PaymentPage /> },
    ],
  },
  {
    element: (
      <CompactLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </CompactLayout>
    ),
    children: [
      { path: 'coming-soon', element: <ComingSoonPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
