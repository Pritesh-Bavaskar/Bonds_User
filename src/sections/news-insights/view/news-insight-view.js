//
import NewsInsightCardList from '../news-insight-card-list';
import NewsInsightSearchSort from '../news-insights-search-sort';
import NewsInsightQuestion from '../news-insight-questions';

// ----------------------------------------------------------------------

export default function NewsInsightView() {
  return (
    <>
      <NewsInsightSearchSort />
      <NewsInsightCardList />
      <NewsInsightQuestion />
    </>
  );
}
