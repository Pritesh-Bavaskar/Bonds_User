//
import NewsInsightCardList from '../news-insight-card-list';
import NewsInsightSearchSort from '../news-insights-search-sort';

// ----------------------------------------------------------------------

export default function NewsInsightView() {
  return (
    <>
      <NewsInsightSearchSort />
      <NewsInsightCardList />
    </>
  );
}
