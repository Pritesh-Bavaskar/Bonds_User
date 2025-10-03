import { Helmet } from 'react-helmet-async';
// sections
import { NewsInsightView } from 'src/sections/news-insights/view';

// ----------------------------------------------------------------------

export default function NewsInsightPage() {
  return (
    <>
      <Helmet>
        <title> News Insights</title>
      </Helmet>

      <NewsInsightView />
    </>
  );
}
